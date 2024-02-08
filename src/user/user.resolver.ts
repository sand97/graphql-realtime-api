import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { RenderUser } from './user.utils';
import { CurrentUser } from './user.decorator';
import { User } from '@prisma/client';
import { GraphqlAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreateOrUpdateUserInput,
  FetchUsersInput,
  UpdateUserInput,
} from '../graphql';
// import { CreateUserInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GraphqlAuthGuard)
  @Query('me')
  me(@CurrentUser() user: User) {
    return new RenderUser(user);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query('users')
  findAll(@Args('payload') payload: FetchUsersInput) {
    return this.userService.findAll(payload);
  }
  //
  // @Query('user')
  // findOne(@Args('id') id: number) {
  //   return this.userService.findOne(id);
  // }
  //
  @UseGuards(GraphqlAuthGuard)
  @Mutation('updateUser')
  update(
    @CurrentUser() user: User,
    @Args('userId') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    // if (user.role !== 'ROOT' && user.role !== 'ADMIN' && id !== user.id) {
    //   throw new HttpException('Unauthorize', HttpStatus.UNAUTHORIZED);
    // }
    return this.userService.update(updateUserInput, id, user);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('removeUser')
  async remove(@CurrentUser() user: User, @Args('id') id: string) {
    if (user.role !== 'ROOT' && user.role !== 'ADMIN') {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    await this.userService.remove(id);
    return { id };
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('createUser')
  create(@Args('createUserInput') payload: CreateOrUpdateUserInput) {
    return this.userService.create(payload);
  }
}
