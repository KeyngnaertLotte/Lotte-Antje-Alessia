import { InputType, Field } from '@nestjs/graphql'
import { Agenda } from '../entities/agenda.entity'

@InputType()
export class UpdateAgendaInput extends Agenda {
  @Field(() => String, { nullable: true })
  taak: string

  @Field(() => String, { nullable: true })
  podium: string

  @Field(() => String, { nullable: true })
  tijd: string

  @Field(() => String, { nullable: true })
  id: string
}
