import { ObjectType, Field } from '@nestjs/graphql'
import { Column } from 'typeorm'
@ObjectType()
export class Agenda {
  @Column()
  @Field()
  id: string

  @Column()
  @Field()
  taak: string

  @Column()
  @Field()
  podium: string

  @Column()
  @Field()
  tijd: string
}
