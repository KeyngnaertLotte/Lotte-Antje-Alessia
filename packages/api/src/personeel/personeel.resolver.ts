import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { PersoneelService } from './personeel.service'
import { Personeel } from './entities/personeel.entity'
import { CreatePersoneelInput } from './dto/create-personeel.input'

@Resolver(() => Personeel)
export class PersoneelResolver {
  constructor(private readonly personeelService: PersoneelService) {}

  @Mutation(() => Personeel, { description: 'Create a bird using the DTO.' })
  createPersoneel(
    @Args('createPersoneelInput') createPersoneelInput: CreatePersoneelInput,
  ): Promise<Personeel> {
    return this.personeelService.create(createPersoneelInput)
  }

  @Query(() => [Personeel], { name: 'personeel' })
  findAll() {
    return this.personeelService.findAll()
  }

  @Query(() => Personeel, { name: 'personeelLid', nullable: true })
  findOneById(@Args('id') id: string): Promise<Personeel> {
    return this.personeelService.findOneById(id)
  }

  @Mutation(() => Personeel)
  removePersoneel(@Args('id', { type: () => Int }) id: number) {
    return this.personeelService.remove(id)
  }
}
