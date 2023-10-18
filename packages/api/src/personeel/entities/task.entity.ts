import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, Column, ObjectIdColumn } from 'typeorm'

@ObjectType()
export class Takenlijst {
  @Field()
  plaats: string

  @Field()
  naam: string

  @Field()
  category: string

  @Field()
  aantal: number

  @Field()
  deadline: string
}
