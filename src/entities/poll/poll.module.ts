import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollRepository } from './poll.repository';
import { PollOptionRepository } from '../poll-option/poll-option.repository';
import { PollResolver } from './poll.resolver';
import { PollService } from './poll.service';

@Module({
  imports: [TypeOrmModule.forFeature([PollRepository, PollOptionRepository])],
  providers: [PollResolver, PollService],
})
export class PoolModule {}
