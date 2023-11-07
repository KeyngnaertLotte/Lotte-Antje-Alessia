import { CreateMateriaalInput } from './create-materiaal.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
// import { Itemlijst } from '../entities/item.entity';

@InputType()
export class UpdateMateriaalInput extends PartialType(CreateMateriaalInput) {
  @Field(() => Int)
  id: number;

  // @Field(() => [Itemlijst])
  // items: Itemlijst[]
}
