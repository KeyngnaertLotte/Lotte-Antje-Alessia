import { CreatePersoneelInput } from './create-personeel.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdatePersoneelInput extends PartialType(CreatePersoneelInput) {
  @Field(() => String, { nullable: true })
  voornaam?: string

  @Field(() => String, { nullable: true })
  achternaam?: string
}
