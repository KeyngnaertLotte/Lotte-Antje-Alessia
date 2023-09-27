import { CreateBezoekerInput } from './create-bezoeker.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBezoekerInput extends PartialType(CreateBezoekerInput) {
  @Field(() => String)
  id: number;
}
