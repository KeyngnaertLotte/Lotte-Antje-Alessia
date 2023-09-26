import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBezoekerInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
