import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Agenda {
  
  @ObjectIdColumn()
  @Field(() => ID)
  id: string  
    
  @Column()
  @Field()
  Opdracht: string

  @Column()
  @Field()
  podium: string

  @Column()
  @Field()
  tijd: string
}
