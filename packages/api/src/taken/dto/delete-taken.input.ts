import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DeleteTakenInput {
  @Field()
  id: number;
}