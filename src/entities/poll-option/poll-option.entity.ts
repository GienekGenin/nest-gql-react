import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Poll } from '../poll/poll.entity';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity({ schema: 'public', name: 'poll-option' })
export class PollOption {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  text: string;

  @Field()
  @Column('integer')
  votes: number;

  @Field()
  @Column()
  pollId: number;

  @ManyToOne(
    () => Poll,
    poll => poll.pollOption,
  )
  poll: Promise<Poll>; // generated a  pollId
}
