import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, ObjectIdColumn } from 'typeorm'

@Entity() // Database link - Typeorm
@ObjectType({ description: 'materiaal'})
export class Materiaal {
  @ObjectIdColumn() // Database link - Typeorm
  @Field(() => ID) // Graphql
  id: number

  @Column() // Database link - Typeorm
  @Field() //graphql
  voornaam: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  achternaam: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  telefoon: number
}
