import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateOrUpdateUserInput,
  FetchUsersInput,
  LoginInput,
  UpdateUserInput,
  UserPage,
} from '../graphql';
import { JwtPayload } from '../auth/jwt.strategy';
import { User, Locale, Role } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from '../prisma/prisma.service';
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
    payload: UpdateUserInput,
    id: string,
    currentUser: User,
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...payload,
        role: payload?.role as Role,
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

  async remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async findAll(dto: FetchUsersInput): Promise<UserPage> {
    const { page, limit, keyword } = dto;
    const where = keyword
      ? {
          OR: [
            {
              name: {
                contains: keyword,
              },
            },
            {
              surname: {
                contains: keyword,
              },
            },
          ],
        }
      : undefined;
    const count = await this.prisma.user.count({ where });
    const users = (await this.prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })) as any;
    return {
      users,
      count,
    };
  }

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
        role: userDto?.role as Role,
        password: await hash(userDto.password, 10),
      },
    });
  }
}
