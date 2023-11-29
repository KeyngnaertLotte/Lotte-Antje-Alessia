import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTaakInput{
    @Field()
    id: string

    @Field()
    plaats: string

    @Field()
    naam: string
    
    @Field()
    type: string

    @Field()
    category: string

    @Field()
    status: boolean

    @Field()
    aantal: number

    @Field()
    deadline: string
}
