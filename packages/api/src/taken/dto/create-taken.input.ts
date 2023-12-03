import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTakenInput {
  @Field()
  plaats: string

  @Field()
  type: string

  @Field()
  naam: string

  @Field()
  category: string

  @Field()
  aantal: number

  @Field()
  deadline: string

  @Field()
  materiaal: string
}
