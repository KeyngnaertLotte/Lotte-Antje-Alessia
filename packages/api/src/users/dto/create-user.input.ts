import { InputType, Field } from '@nestjs/graphql'
import { Role } from '../entities/user.entity'

@InputType()
export class CreateUserInput {
  // @Field(() => String, { description: 'Example field (placeholder)' })
  // uid: string

  @Field(() => String, { description: 'Optional locale of the current user' })
  locale?: string

  // uid
  @Field(() => String, { description: 'Optional uid of the current user' })
  uid: string

  @Field(() => String, { description: 'Optional role of the current user' })
  naam: string

  @Field(() => String, { description: 'Optional role of the current user' })
  role?: Role
}
