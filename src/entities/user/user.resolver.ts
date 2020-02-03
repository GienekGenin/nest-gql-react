import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SignupInput } from './input/signup-input';
import { UserService } from './user.service';
import { ErrorResponce } from './shared/errorResponse';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => String)
  async hello() {
    return 'Hello World';
  }

  @Mutation(() => [ErrorResponce], { nullable: true })
  async singup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<ErrorResponce[] | null> {
    return this.userService.signup(signupInput);
  }
}
