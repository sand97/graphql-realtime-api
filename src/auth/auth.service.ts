import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { I18nService } from 'nestjs-i18n';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateOrUpdateUserInput, LoginInput, LoginResponse } from '../graphql';
import { RenderUser, UserRole } from '../user/user.utils';

// import {User} from "../users/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
    private readonly i18n: I18nService,
  ) {}

  async login(loginUserDto: LoginInput): Promise<LoginResponse> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user as User);

    return {
      ...token,
      user: new RenderUser(user),
    };
  }

  async sign(payload: CreateOrUpdateUserInput): Promise<LoginResponse> {
    // check if any user exists in db
    const users = await this.prisma.user.findMany();
    if (users.length > 0) {
      throw new HttpException(
        await this.i18n.translate('auth.USER_EXISTS'),
        HttpStatus.BAD_REQUEST,
      );
    }
    // find user in db
    const user = await this.usersService.create({
      ...payload,
      role: UserRole.ROOT,
    });

    // generate and sign token
    const token = this._createToken(user as User);

    return {
      ...token,
      role: UserRole.ADMIN,
      user: new RenderUser(user),
    };
  }

  private _createToken(user: JwtPayload): any {
    const Authorization = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException(
        await this.i18n.translate('auth.INVALID_TOKEN'),
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: User;
}

export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: User[];
}
