import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Poll } from '../poll/poll.entity';

@Entity({ schema: 'public', name: 'poll-option' })
export class PollOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @Column('integer')
  votes: number;

  @Column()
  pollId: number;

  @ManyToOne(
    () => Poll,
    poll => poll.pollOption,
  )
  poll: Promise<Poll>; // generated a  pollId
}
