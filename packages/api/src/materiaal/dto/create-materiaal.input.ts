import { InputType, Int, Field } from '@nestjs/graphql';
// import { Itemlijst } from '../entities/item.entity';

@InputType()
export class CreateMateriaalInput {
  // deze ook weg want naam van item zit in itemlijst
  @Field()
  item: string;

  @Field()
  categorie: string;

  // deze dan weg want zit in itemlijst
  @Field()
  aantal: number;

  // @Field(() => [Itemlijst])
  // items: Itemlijst[];
}
