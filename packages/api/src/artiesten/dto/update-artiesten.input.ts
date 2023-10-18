import { Benodigdheden } from '../entities/benodigdheden.entity'
import { CreateArtiestenInput } from './create-artiesten.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateArtiestenInput extends PartialType(CreateArtiestenInput) {

  @Field(() => [Benodigdheden])
  benodigdheden: Benodigdheden[]
}
