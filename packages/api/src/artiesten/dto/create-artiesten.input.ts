import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateArtiestenInput {
  @Field()
  naam: string

  @Field()
  uid: string
}
