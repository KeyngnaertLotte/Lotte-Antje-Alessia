import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class CreatePersoneelInput {
  @Field()
  uid: string

  @Field()
  voornaam: string

  @Field()
  achternaam: string

  @Field()
  type: string
}
