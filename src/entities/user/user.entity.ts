import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Poll } from '../poll/poll.entity';

@Entity({ schema: 'public', name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ length: 255, unique: true })
  userName: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: false })
  confirmed: boolean;

  @OneToMany(
    () => Poll,
    poll => poll.user,
  )
  pool: Promise<Poll[]>;
}
