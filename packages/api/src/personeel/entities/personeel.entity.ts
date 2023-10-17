import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, ObjectIdColumn } from 'typeorm'

import { Takenlijst } from './task.entity'

@Entity()
@ObjectType()
export class Personeel {
  @ObjectIdColumn()
  @Field(() => ID)
  id: number

  @Column()
  @Field()
  uid: string

  @Column()
  @Field()
  voornaam: string

  @Column()
  @Field()
  achternaam: string

  @Column()
  @Field(() => [Takenlijst])
  takenlijst?: Takenlijst[];
}
