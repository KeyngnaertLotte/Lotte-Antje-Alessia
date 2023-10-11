import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

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
  saldo?: number

  @Column()
  @Field(() => [String]) // Specify the array type
  favoartiest?: string[];
}
