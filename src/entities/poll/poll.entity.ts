import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { PollOption } from '../poll-option/poll-option.entity';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity({ schema: 'public', name: 'poll' })
export class Poll {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  name: string;

  @Field()
  @Column()
  userId: string;

  @ManyToOne(
    () => User,
    user => user.poll,
  )
  user: Promise<User>; // generated a userId

  @Field(() => [PollOption])
  @OneToMany(
    () => PollOption,
    pollOption => pollOption.poll,
  )
  pollOption: Promise<PollOption[]>;
}
