import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum Role {
  BEZOEKER = 'BEZOEKER',
  ARTIEST = 'ARTIEST',
  PERSONEEL = 'PERSONEEL',
}

@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  uid: string

  @Column()
  @Field()
  locale?: string

  @Column({ default: Role.BEZOEKER })
  @Field(() => String)
  role: Role

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  UpdatedAt?: Date
}
