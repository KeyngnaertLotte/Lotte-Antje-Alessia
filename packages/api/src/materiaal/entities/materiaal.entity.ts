import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Materiaal {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Field()
  @Column()
  item: string

  @Field()
  @Column()
  categorie: string

  @Field()
  @Column()
  aantal: number

}
