import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';

export const passportModule = () =>
  PassportModule.register({
    defaultStrategy: 'jwt',
    property: 'user',
    session: false,
  });

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRETKEY'),
        signOptions: {
          expiresIn: configService.get('EXPIRESIN'),
        },
        endPoint: configService.get('MINIO_ENDPOINT'),
        port: parseInt(configService.get('MINIO_PORT')),
        useSSL: false, // If on localhost, keep it at false. If deployed on https, change to true
        accessKey: configService.get('MINIO_ACCESS_KEY'),
        secretKey: configService.get('MINIO_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [JwtModule],
})
export class GetJwtModule {}

@Module({
  imports: [PrismaModule, UserModule, passportModule(), GetJwtModule],
  providers: [AuthService, JwtStrategy, ConfigService, AuthResolver],
  exports: [],
})
export class AuthModule {}
