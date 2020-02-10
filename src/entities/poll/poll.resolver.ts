import {
  Resolver,
  Mutation,
  Args,
  Context,
  Query,
  ResolveProperty,
  Root,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { GetUserId } from 'src/common/decorators/getUserId.decorator';
import { CreatePollArgs } from '../../common/args/createPoll.args';
import { PollService } from './poll.service';
import { MyContext } from '../../common/types/MyContext.types';
import { Poll } from './poll.entity';
import { AllPollsArgs } from 'src/common/args/allpolls.args';
import { PollOption } from '../poll-option/poll-option.entity';

@Resolver(() => Poll)
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

  @Query(() => [Poll])
  async allPoll(@Args() { take, skip }: AllPollsArgs): Promise<Poll[]> {
    return await this.pollService.allPolls(take, skip);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async deletePoll(
    @Context() ctx: MyContext,
    @Args('id') id: number,
  ): Promise<boolean> {
    return this.pollService.delete(ctx, id);
  }

  @Query(() => [Poll])
  @UseGuards(AuthGuard)
  async myPoll(@GetUserId() userId: string): Promise<Poll[]> {
    return this.pollService.myPoll(userId);
  }

  @ResolveProperty('pollOption')
  async pollOption(
    @Root() poll: Poll,
    @Context() ctx: MyContext,
  ): Promise<PollOption[]> {
    return await ctx.pollOptionLoader.load(poll.id);
  }
}
