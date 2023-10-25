import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class CreateBenodigdhedenInput {
  @Field()
  item: string

  @Field()
  categorie: string

  @Field()
  aantal: number
}
