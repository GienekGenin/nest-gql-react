import { Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Resolver('Poll')
export class PollResolver {
  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async createPoll() {
    return true;
  }
}
