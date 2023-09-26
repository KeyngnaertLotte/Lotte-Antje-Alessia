import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Bezoeker {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  voornaam: string

  @Column()
  @Field()
  achternaam: string

  @Column()
  @Field()
  email: string

  @Column()
  @Field()
  saldo: string

  // @Column()
  // @Field()
  // favoartiest: Array<string>
}
