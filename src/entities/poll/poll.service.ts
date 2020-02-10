import { Injectable } from '@nestjs/common';
import { PollRepository } from './poll.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PollOptionRepository } from '../poll-option/poll-option.repository';
import { MyContext } from '../user/uesr.types';
import { redis } from 'src/redis';
import { POLL_OPTION_ID_PREFIX } from 'src/constants';
import { Poll } from './poll.entity';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(PollRepository)
    private readonly pollRepo: PollRepository,

    @InjectRepository(PollOptionRepository)
    private readonly pollOptionRepo: PollOptionRepository,
  ) {}
  async createPoll(
    userId: string,
    name: string,
    options: string[],
  ): Promise<boolean> {
    const poll = await this.pollRepo.insert({
      name,
      userId,
    });

    options.map(async text => {
      await this.pollOptionRepo.insert({
        text,
        votes: 0,
        pollId: poll.raw[0].id,
      });
    });

    return true;
  }

  async vote(ctx: MyContext, pollOptionId: number): Promise<boolean> {
    try {
      const pollOption = await this.pollOptionRepo.findOne({
        id: pollOptionId,
      });

      const ip =
        ctx.req.header('x-forwarded-for') || ctx.req.connection.remoteAddress;

      if (ip) {
        const hasIp = await redis.sismember(
          `${POLL_OPTION_ID_PREFIX}${pollOption.pollId}`,
          ip,
        );
        if (hasIp) {
          return Promise.resolve(false);
        }
      }

      await redis.sadd(`${POLL_OPTION_ID_PREFIX}${pollOption.pollId}`, ip);

      await this.pollOptionRepo.update(
        { id: pollOptionId },
        { votes: pollOption.votes + 1 },
      );

      return Promise.resolve(true);
    } catch (e) {
      console.error(e);
      return Promise.resolve(false);
    }
  }

  async poll(id: number): Promise<Poll> {
    return this.pollRepo.findOne({ where: { id }, relations: ['pollOption'] });
  }

  async allPolls(take: number, skip: number): Promise<Poll[]> {
    return this.pollRepo
      .createQueryBuilder('poll')
      .innerJoinAndSelect('poll.pollOption', 'pollOption')
      .orderBy('poll.name', 'ASC')
      .take(take)
      .skip(skip)
      .getMany();
  }
}
