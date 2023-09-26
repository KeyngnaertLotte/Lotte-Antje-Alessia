import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Artiesten {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  stage: string
}
