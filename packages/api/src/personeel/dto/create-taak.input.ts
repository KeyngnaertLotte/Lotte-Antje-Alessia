import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTaakInput{
    @Field()
    plaats: string

    @Field()
    naam: string

    @Field()
    categorie: string

    @Field()
    aantal: number

    @Field()
    deadline: string
}
