import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

import { Agenda } from './agenda.entity'
@Entity()
@ObjectType()
export class Artiest {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  uid: string

  @Column()
  @Field()
  naam: string

  @Column()
  @Field()
  podium: string

  @Column()
  @Field(() => [String])
  benodigdheden: String[]

  @Column({ nullable: true })
  @Field(() => [Agenda])
  kalender: Agenda[]
}
