import { InputType, Field, Int } from '@nestjs/graphql';
import { Takenlijst } from '../entities/task.entity';


@InputType()
export class CreatePersoneelInput {
  @Field()
  voornaam: string

  @Field()
  achternaam: string

  @Field()
  type: string

  @Field(() => [Takenlijst])
  takenlijst?: Takenlijst[];
}


