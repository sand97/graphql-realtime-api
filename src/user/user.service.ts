import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrUpdateUserInput, LoginInput } from '../graphql';
import { JwtPayload } from '../auth/jwt.strategy';
import { User, Locale } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from '../prisma/prisma.service';
// import { CreateUserInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';
import { compare, hash } from 'bcrypt';
import { RenderUser } from './user.utils';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}
  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException(
        await this.i18n.translate('auth.not_user_found'),
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  async update(
    payload: CreateOrUpdateUserInput,
    id: string,
    currentUser: User,
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...payload,
        password:
          (currentUser.role === 'ROOT' || currentUser.id === id) &&
          payload.password
            ? await hash(payload.password, 10)
            : undefined,
      },
    });

    return user;
  }

  async changeUserLanguage(id: string, language: Locale): Promise<RenderUser> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        language: language,
      },
    });
    return new RenderUser(user);
  }

  // async updatePassword(payload: UpdaPa, id: string): Promise<User> {
  //   const user = await this.prisma.user.findUnique({
  //     where: { id },
  //   });
  //   if (!user) {
  //     throw new HttpException(
  //       await this.i18n.translate('auth.invalid_credentials'),
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  //   // compare passwords
  //   const areEqual = await compare(payload.old_password, user.password);
  //   if (!areEqual) {
  //     throw new HttpException(
  //       await this.i18n.translate('auth.invalid_credentials'),
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  //   return await this.prisma.user.update({
  //     where: { id },
  //     data: { password: await hash(payload.new_password, 10) },
  //   });
  // }

  async findByPayload({ email }: JwtPayload): Promise<User | undefined> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findByLogin({ email, password }: LoginInput): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    // console.log('user_logged', user);
    // console.log('payload', { phone, password, country_code });

    if (!user || !user.password) {
      throw new HttpException(
        await this.i18n.translate('auth.invalid_credentials'),
        HttpStatus.UNAUTHORIZED,
      );
    }

    // compare passwords
    const areEqual = await compare(password, user.password);
    // console.log('compare', areEqual);

    if (!areEqual) {
      throw new HttpException(
        await this.i18n.translate('auth.invalid_credentials'),
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  async create(userDto: CreateOrUpdateUserInput): Promise<any> {
    // // check if the user exists in the db
    const userInDb = await this.prisma.user.findFirst({
      where: { email: userDto.email },
    });
    if (userInDb) {
      throw new HttpException(
        await this.i18n.translate('auth.user_already_exist'),
        HttpStatus.CONFLICT,
      );
    }
    return await this.prisma.user.create({
      data: {
        ...userDto,
        password: await hash(userDto.password, 10),
        role: 'CLIENT' as const,
      },
    });
  }
}
