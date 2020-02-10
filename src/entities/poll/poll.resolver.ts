import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { GetUserId } from 'src/common/decorators/getUserId.decorator';
import { CreatePollArgs } from '../../common/args/createPoll.args';
import { PollService } from './poll.service';
import { MyContext } from '../user/uesr.types';
import { Poll } from './poll.entity';

@Resolver('Poll')
export class PollResolver {
  constructor(private readonly pollService: PollService) {}

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async createPoll(
    @GetUserId() userId: string,
    @Args() { name, options }: CreatePollArgs,
  ): Promise<boolean> {
    return this.pollService.createPoll(userId, name, options);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async vote(
    @Context() ctx: MyContext,
    @Args('pollOptionId') pollOptionId: number,
  ): Promise<boolean> {
    return this.pollService.vote(ctx, pollOptionId);
  }

  @Query(() => Poll)
  async poll(@Args('id') id: number): Promise<Poll> {
    return await this.pollService.poll(id);
  }
}
