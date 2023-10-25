import { ObjectType, Field } from '@nestjs/graphql';
import { CreateDateColumn } from 'typeorm';

@ObjectType()
export class Transactie {
  @Field()
  transactie: string;

  @Field()
  aantal: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  tijd: Date;
}
