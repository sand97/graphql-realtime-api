import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { I18nService } from 'nestjs-i18n';
import { MinioClientService } from '../minio-client/minio-client.service';
import { ConfigService } from '@nestjs/config';
import { AssetUrlService } from './asset.url.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssetService {
  constructor(
    private readonly minioClientService: MinioClientService,
    private readonly i18n: I18nService,
    private readonly assetUrlService: AssetUrlService,
    private readonly configService: ConfigService,
    // @InjectQueue('asset') private readonly assetQueue: Queue,
    private readonly prisma: PrismaService,
  ) {}

  private logger: Logger = new Logger(AssetService.name);

  time: number = 0;

  /**
   *
   * @param file File to upload
   * @param dto contain id of store or product variant
   *
   * 1 => Create compressed image with same format and upload it on Minio
   * 2 => Launch job tasks to process another images format
   *
   */
  async uploadFile(file: any) {
    if (
      !(
        file.mimetype.includes('jpeg') ||
        file.mimetype.includes('png') ||
        file.mimetype.includes('avif') ||
        file.mimetype.includes('webp')
      )
    ) {
      throw new HttpException(
        await this.i18n.t('asset.incorrect_file_format'),
        HttpStatus.BAD_REQUEST,
      );
    }

    const sharp = require('sharp');

    const timestamp = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(timestamp)
      .digest('hex');

    const extension = 'avif';

    const fileNameThumbnail = `${hashedFileName}-thumbnail.${extension}`;

    const compressedFileThumbnail = await sharp(file.buffer)
      .resize({
        height: 640,
        width: 512,
        fit: 'cover',
      })
      .toBuffer();

    await this.minioClientService.uploadBuffer(
      compressedFileThumbnail,
      fileNameThumbnail,
      `image/${extension}`,
    );

    return {
      message: await this.i18n.translate('asset.asset_created_successful'),
      image: this.assetUrlService.getFileUrl(fileNameThumbnail),
    };
  }
}
