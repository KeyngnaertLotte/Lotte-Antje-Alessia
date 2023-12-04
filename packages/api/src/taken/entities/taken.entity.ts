import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'
import { ObjectId } from 'mongodb'

@Entity()
@ObjectType()
export class Taak {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Field()
  @Column()
  plaats: string

  @Field()
  @Column()
  type: string

  @Field()
  @Column()
  status: boolean = false

  @Field()
  @Column()
  naam: string

  @Field()
  @Column()
  category: string

  @Field()
  @Column()
  aantal: number

  @Field()
  @Column()
  deadline: string

  @Field()
  @Column()
  materiaal: string

  @Field()
  @Column()
  status: string
}
