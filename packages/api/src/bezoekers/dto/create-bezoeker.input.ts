import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBezoekerInput {
  @Field()
  voornaam: string

  @Field()
  achternaam: string

  @Field()
  email: string

  @Field()
  saldo: number

  // @Field()
  // favoartiest: Array<string>

}
