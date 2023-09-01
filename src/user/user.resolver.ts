import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { RenderUser } from './user.utils';
import { CurrentUser } from './user.decorator';
import { User } from '@prisma/client';
import { GraphqlAuthGuard } from '../auth/jwt-auth.guard';
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
  //
  // @Query('user')
  // findOne(@Args('id') id: number) {
  //   return this.userService.findOne(id);
  // }
  //
  // @Mutation('updateUser')
  // update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }
  //
  // @Mutation('removeUser')
  // remove(@Args('id') id: number) {
  //   return this.userService.remove(id);
  // }
}
