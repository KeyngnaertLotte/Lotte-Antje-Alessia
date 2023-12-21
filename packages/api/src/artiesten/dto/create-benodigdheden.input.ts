import { InputType, Field} from '@nestjs/graphql'

@InputType()
export class CreateBenodigdhedenInput {
  @Field()
  item: string

  @Field()
  categorie: string

  @Field()
  aantal: number

  @Field()
  deadline: string
}
