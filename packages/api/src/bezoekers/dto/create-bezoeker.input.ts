import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBezoekerInput {
  @Field()
  uid: string

  @Field()
  saldo: number

  @Field()
  favoartiest: Array<string>

}
