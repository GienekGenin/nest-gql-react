import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class ErrorResponce {
  @Field()
  path: string;

  @Field()
  message: string;
}
