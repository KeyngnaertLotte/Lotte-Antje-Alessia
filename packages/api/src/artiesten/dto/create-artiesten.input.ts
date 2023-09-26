import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateArtiestenInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
