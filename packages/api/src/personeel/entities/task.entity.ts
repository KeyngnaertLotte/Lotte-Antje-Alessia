import { ObjectType, Field } from '@nestjs/graphql'
import { Entity, Column, ObjectIdColumn } from 'typeorm'

@ObjectType()
export class Takenlijst {
  // id nodig om uit grote takenlijst een taak te halen
  @Field()
  id: string

  @Field()
  plaats: string

  @Field()
  naam: string

  @Field()
  status: boolean

  @Field()
  category: string

  @Field()
  aantal: number

  @Field()
  deadline: string
}
