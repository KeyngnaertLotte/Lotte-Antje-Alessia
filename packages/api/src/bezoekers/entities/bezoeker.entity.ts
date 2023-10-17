import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

import { FavArtiest } from './favartiest.entity'

@Entity()
@ObjectType()
export class Bezoeker {
  @ObjectIdColumn()
  @Field(() => ID)
  id: number

  @Column()
  @Field()
  uid: string

  @Column()
  @Field()
  naam: string

  @Column()
  @Field()
  saldo?: number;

  @Column()
  @Field(() => [FavArtiest]) 
  favoartiest?: FavArtiest[];
}
