import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'
@ObjectType()
export class Agenda {
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
