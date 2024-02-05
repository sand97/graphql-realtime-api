import {
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
import { AssetService } from './asset.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from '../prisma/prisma.service';

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
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileExtender)
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile('file') image) {
    return await this.assetService.uploadFile(image);
  }
}
