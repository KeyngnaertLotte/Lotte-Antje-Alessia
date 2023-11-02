import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Itemlijst {
  @Field()
  naam: string

  @Field()
  aantal: number
}
