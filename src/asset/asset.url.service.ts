import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AssetUrlService {
  constructor(private readonly configService: ConfigService) {}

  private getConfig(): { host: string; protocol: string } {
    const dev = !(this.configService.get('MINIO_ENDPOINT') as string).includes(
      'files',
    );
    const host = dev ? 'localhost:9000' : process.env.MINIO_ENDPOINT;
    const protocol = dev ? 'http' : 'https';

    return { host, protocol };
  }

  getFileUrl(fileName: string, bucket?: string) {
    const { host, protocol } = this.getConfig();
    return `${protocol}://${host}/${
      bucket ?? this.configService.get('MINIO_BUCKET_NAME')
    }/${fileName}`;
  }

  getFileName(fileUrl: string) {
    const { host, protocol } = this.getConfig();
    return fileUrl.split(
      `${protocol}://${host}/${this.configService.get('MINIO_BUCKET_NAME')}/`,
    )[1];
  }
}
