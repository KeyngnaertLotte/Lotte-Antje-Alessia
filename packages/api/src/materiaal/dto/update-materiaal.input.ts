import { CreateMateriaalInput } from './create-materiaal.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateMateriaalInput extends PartialType(CreateMateriaalInput) {
  @Field(() => Int)
  id: number
}
