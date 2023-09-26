import { CreateArtiestenInput } from './create-artiesten.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateArtiestenInput extends PartialType(CreateArtiestenInput) {
  @Field(() => Int)
  id: number;
}
