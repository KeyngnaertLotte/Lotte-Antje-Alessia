import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Materiaal {
  @ObjectIdColumn()
  @Field(()=> ID)
  id: string;

  // deze weg want naam van items zit in itemlijst
  @Field()
  @Column()
  item: string;

  @Field()
  @Column()
  categorie: string;

  // deze weg want zit in itemlijst
  @Field()
  @Column()
  aantal: number;

  
  
  // @Column()
  // @Field(() => [Itemlijst])
  // items?: Itemlijst[];
}
