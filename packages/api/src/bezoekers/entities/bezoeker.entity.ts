import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Bezoeker {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;
  @Field(() => ID)
  id: string

  @Field()
  name: string
}
