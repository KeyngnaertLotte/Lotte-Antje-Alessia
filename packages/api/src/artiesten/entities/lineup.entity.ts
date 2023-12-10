import { ObjectType, Field } from '@nestjs/graphql'
import { Column } from 'typeorm'

@ObjectType()
export class LineUp {
  @Column()
  @Field()
  naam: string

  @Column()
  @Field()
  podium: string

  @Column()
  @Field()
  tijd: string
}
