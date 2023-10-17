import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, ObjectIdColumn } from 'typeorm'

@Entity() // Database link - Typeorm
@ObjectType({ description: 'personeel'})
export class Personeel {
  @ObjectIdColumn() // Database link - Typeorm
  @Field(() => ID) // Graphql
  id: number

  @Column()
  @Field()
  uid: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  voornaam: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  achternaam: string
}
