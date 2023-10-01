import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { I18nService } from 'nestjs-i18n';
import { CreateAssetDto } from './asset.dto';
import { MinioClientService } from '../minio-client/minio-client.service';
import { ConfigService } from '@nestjs/config';
import { AssetUrlService } from './asset.url.service';
import sharp from 'sharp';
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
  async uploadFile(file: any, dto: CreateAssetDto) {
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

    if (
      !(await this.prisma.medicament.findFirst({
        where: { id: dto.medicamentId },
      }))
    ) {
      throw new HttpException('Medicament not exist', HttpStatus.NOT_FOUND);
    }

    const timestamp = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(timestamp)
      .digest('hex');

    const extension = 'avif';

    const id = dto.medicamentId;

    const fileNameThumbnail = `${hashedFileName}-${id}-thumbnail.${extension}`;

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

    const data = await this.prisma.medicament.update({
      where: {
        id,
      },
      data: {
        image: this.assetUrlService.getFileUrl(fileNameThumbnail),
      },
    });

    return {
      message: await this.i18n.translate('asset.asset_created_successful'),
      data,
    };
  }
}
