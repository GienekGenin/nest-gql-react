import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { SignupInput, LoginInput } from './input';
import { UserService } from './user.service';
import { ErrorResponce } from './shared/errorResponse';
import { MyContext } from './uesr.types';

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

  @Mutation(() => [ErrorResponce], { nullable: true })
  async login(
    @Args('login') loginInput: LoginInput,
    @Context() ctx: MyContext,
  ): Promise<ErrorResponce[] | null> {
    return this.userService.login(loginInput, ctx.req);
  }

  @Mutation(() => Boolean, { nullable: true })
  async logout(@Context() ctx: MyContext) {
    return this.userService.logout(ctx);
  }
}
