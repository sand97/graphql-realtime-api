import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioClientService {
  constructor(
    private readonly minioClient: MinioService,
    private readonly configService: ConfigService,
  ) {}

  async uploadBuffer(
    buffer: Buffer,
    filleName: string,
    contentType: string,
  ): Promise<void> {
    const metaData = {
      'Content-Type': contentType,
    };
    try {
      return await new Promise(async (resolve, reject) => {
        this.minioClient.client.putObject(
          this.configService.get('MINIO_BUCKET_NAME'),
          filleName,
          buffer,
          metaData,
          function (err) {
            if (err) {
              console.log('error', err);
              reject(err);
            } else {
              resolve(null);
            }
          },
        );
      });
    } catch (e) {
      throw new HttpException(
        'Something wen wrong when uploading of image. Please contact administrator.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeFile(fileName: string, bucket?: string) {
    await this.minioClient.client.removeObject(
      bucket ?? this.configService.get('MINIO_SOCIAL_BUCKET_NAME'),
      fileName,
    );
  }

  async uploadFile(
    filePath: string,
    fileName: string,
    contentType: string,
    bucket?: string,
  ) {
    const metaData = {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
    };
    try {
      return await new Promise(async (resolve, reject) => {
        this.minioClient.client.fPutObject(
          bucket ?? this.configService.get('MINIO_SOCIAL_BUCKET_NAME'),
          fileName,
          filePath,
          metaData,
          function (err) {
            if (err) {
              console.log('error', err);
              reject(err);
            } else {
              resolve(null);
            }
          },
        );
      });
    } catch (e) {
      throw new HttpException(
        'Something wen wrong when uploading of image. Please contact administrator.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFileBuffer(fileName: string, bucket: string): Promise<Buffer> {
    const _buf = Array<any>();
    return await new Promise(async (resolve, reject) => {
      this.minioClient.client.getObject(
        bucket,
        fileName,
        function (err, dataStream) {
          if (err) {
            return reject(err);
          }
          dataStream.on('data', function (chunk) {
            _buf.push(chunk);
          });
          dataStream.on('end', function () {
            resolve(Buffer.concat(_buf));
          });
          dataStream.on('error', function (err) {
            reject(err);
          });
        },
      );
    });
  }
}
