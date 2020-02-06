import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollRepository } from '../poll/poll.repository';
import { PollOptionRepository } from './poll-option.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PollRepository, PollOptionRepository])],
})
export class PoolOptionsModule {}
