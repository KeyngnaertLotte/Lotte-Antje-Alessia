import { InputType, Field, Int } from '@nestjs/graphql';


@InputType()
export class CreatePersoneelInput {
  @Field()
  voornaam: string

  @Field()
  achternaam: string
  
  @Field()
  telefoon: number
}
