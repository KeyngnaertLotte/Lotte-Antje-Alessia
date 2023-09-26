import { CreatePersoneelInput } from './create-personeel.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePersoneelInput extends PartialType(CreatePersoneelInput) {
  @Field(() => Int)
  id: number;
}
