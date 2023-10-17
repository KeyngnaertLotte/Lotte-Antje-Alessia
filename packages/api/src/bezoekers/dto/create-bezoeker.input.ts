import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBezoekerInput {
  @Field()
  uid: string

  @Field()
  naam: string

}
