import { InputType, Int, Field } from '@nestjs/graphql'
import { Agenda } from '../entities/agenda.entity'

@InputType()
export class CreateArtiestenInput {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;
  @Field()
  naam: string

  @Field()
  podium: string

  @Field()
  uid: string
}
