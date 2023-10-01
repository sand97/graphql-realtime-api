import {Module} from "@nestjs/common";
import {AssetController} from "./asset.controller";
import {AssetService} from "./asset.service";
import {PrismaService} from "../prisma.service";
import {MinioClientModule} from "../minio-client/minio-client.module";
import {BullModule} from "@nestjs/bull";
import {AssetProcessor} from "./asset.processor";
import {ConfigService} from "@nestjs/config";
import {AssetUrlService} from "./asset.url.service";

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'asset',
        }),
        MinioClientModule
    ],
    exports: [AssetUrlService],
    controllers: [AssetController],
    providers: [AssetUrlService, ConfigService, AssetProcessor, AssetService, PrismaService]
})
export class AssetModule {
}
