import { CreateTakenInput } from './create-taken.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTakenInput extends PartialType(CreateTakenInput) {
  @Field(() => String, { nullable: true })
  naam?: string;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => String, { nullable: true })
  plaats?: string;

  @Field(() => Int, { nullable: true })
  aantal?: number;

  @Field(() => String, { nullable: true })
  deadline?: string;

  @Field(() => String, { nullable: true })
  materiaal?: string;

  @Field(()=> Boolean, {nullable: true})
  status?: boolean;
}
