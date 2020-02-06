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
  id?: number;

  @Column({ length: 255 })
  text: string;

  @Column()
  voutes: number;

  @ManyToOne(
    () => Poll,
    poll => poll.pollOption,
  )
  @JoinColumn()
  poll: Promise<Poll>;
}
