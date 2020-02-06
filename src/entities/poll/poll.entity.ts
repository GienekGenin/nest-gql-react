import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { PollOption } from '../poll-option/poll-option.entity';

@Entity({ schema: 'public', name: 'poll' })
export class Poll {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 255, unique: true })
  name: string;

  @ManyToOne(
    () => User,
    user => user.pool,
  )
  @JoinColumn()
  user: Promise<User>;

  @OneToMany(
    () => PollOption,
    pollOption => pollOption.poll,
  )
  pollOption: Promise<PollOption[]>;
}
