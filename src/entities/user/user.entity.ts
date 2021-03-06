import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Poll } from '../poll/poll.entity';

@Entity({ schema: 'public', name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;
  // todo default should be false
  @Column({ default: true })
  confirmed: boolean;

  @OneToMany(
    () => Poll,
    poll => poll.user,
  )
  poll: Promise<Poll[]>;
}
