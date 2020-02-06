import { EntityRepository, Repository } from 'typeorm';
import { PollOption } from './poll-option.entity';

@EntityRepository(PollOption)
export class PollOptionRepository extends Repository<PollOption> {}
