import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { MinioClientModule } from '../minio-client/minio-client.module';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { AssetUrlService } from './asset.url.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'asset',
    }),
    MinioClientModule,
    PrismaModule,
  ],
  exports: [AssetUrlService],
  controllers: [AssetController],
  providers: [AssetUrlService, ConfigService, AssetService],
})
export class AssetModule {}
