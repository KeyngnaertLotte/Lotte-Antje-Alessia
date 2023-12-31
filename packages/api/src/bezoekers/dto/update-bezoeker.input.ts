import { CreateBezoekerInput } from './create-bezoeker.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBezoekerInput extends PartialType(CreateBezoekerInput) {
  @Field(() => String)
  id: number;
}

@InputType()
export class FavoArtiestInput {
  @Field({ nullable: true })
  artiest?: string;

  @Field({ nullable: true })
  startTime?: string;

  @Field({ nullable: true })
  endTime?: string;

  @Field({ nullable: true })
  color?: string;
}


