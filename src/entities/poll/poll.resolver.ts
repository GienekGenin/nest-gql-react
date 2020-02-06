import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { GetUserId } from 'src/common/decorators/getUserId.decorator';
import { CreatePollArgs } from '../../common/args/createPoll.args';
import { PollService } from './poll.service';

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
}
