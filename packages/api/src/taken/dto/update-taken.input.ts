import { CreateTakenInput } from './create-taken.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTakenInput extends PartialType(CreateTakenInput) {
  @Field(() => Int)
  id: number;
}
