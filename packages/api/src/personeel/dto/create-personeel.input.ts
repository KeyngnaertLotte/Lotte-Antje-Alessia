import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePersoneelInput {
  @Field()
  voornaam: string

  @Field()
  achternaam: string
}
