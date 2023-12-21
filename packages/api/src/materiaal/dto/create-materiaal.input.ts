import { InputType, Int, Field } from '@nestjs/graphql'
@InputType()
export class CreateMateriaalInput {
  @Field()
  item: string

  @Field()
  categorie: string

  @Field()
  aantal: number
}
