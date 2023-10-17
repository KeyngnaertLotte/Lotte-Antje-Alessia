import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column } from 'typeorm'
@ObjectType()
export class Benodigdheden {
  @Column()
  @Field()
  item: string

  @Column()
  @Field()
  podium: string

  @Column()
  @Field()
  categorie: string

    @Column()
    @Field()
    aantal: number
}
