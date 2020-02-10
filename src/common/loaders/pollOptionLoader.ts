import * as Dataloader from 'dataloader';
import { getConnection, getRepository } from 'typeorm';
import { Poll } from 'src/entities/poll/poll.entity';

export const pollOptionLoader = () =>
  new Dataloader(async (keys: number[]) => {
    const polls = await getRepository(Poll)
      .createQueryBuilder('poll')
      .leftJoinAndSelect('poll.pollOption', 'pollOption')
      .where('poll.id IN (:...keys)', { keys })
      .getMany();
    return polls.map(poll => poll.pollOption);
  });
