import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

import { Agenda } from './agenda.entity'
import { Benodigdheden } from './benodigdheden.entity'
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
  @Field(() => [Benodigdheden])
  benodigdheden: Benodigdheden[]

  @Column({ nullable: true })
  @Field(() => [Agenda])
  agenda: Agenda[]
}
