import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateOrUpdateUserInput } from '../graphql';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('sign')
  sign(@Args('signInput') payload: CreateOrUpdateUserInput) {
    return this.authService.sign(payload);
  }
  @Query('login')
  login(@Args('loginInput') payload: CreateOrUpdateUserInput) {
    return this.authService.login(payload);
  }
}
