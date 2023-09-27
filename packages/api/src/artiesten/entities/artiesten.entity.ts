import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'
@Entity()
@ObjectType()
export class Artiesten {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  naam: string

  @Column()
  @Field()
  podium: string
}
