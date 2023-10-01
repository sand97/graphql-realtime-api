import {
  Body,
  CallHandler,
  Controller,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { validate } from 'class-validator';
import { AssetService } from './asset.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto } from './asset.dto';

@Injectable()
export class FileExtender implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (!req.file) {
      throw new HttpException('File is require', HttpStatus.BAD_REQUEST);
    }

    return next.handle();
  }
}

@Controller('asset')
@ApiTags('asset')
export class AssetController {
  constructor(
    private readonly assetService: AssetService,
    private readonly i18n: I18nService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('upload')
  @ApiSecurity('access-key')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        productVariantId: { type: 'string' },
        storeId: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileExtender)
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile('file') image, @Body() body) {
    const dto = new CreateAssetDto();

    Object.keys(body).forEach((key) => {
      const v = body[key];
      dto[key] = ['false', 'true'].includes(v)
        ? JSON.parse(v)
        : isNaN(v)
        ? v
        : Number(v);
    });

    const errors = await validate(dto);

    if (errors.length > 0)
      throw new HttpException(
        {
          message: await this.i18n.t('auth.please_fill_all_fields'),
          errors,
        },
        HttpStatus.BAD_REQUEST,
      );

    return await this.assetService.uploadFile(image, dto);
  }
}
