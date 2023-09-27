import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { PersoneelService } from './personeel.service'
import { Personeel } from './entities/personeel.entity'
import { CreatePersoneelInput } from './dto/create-personeel.input'

@Resolver(() => Personeel)
export class PersoneelResolver {
  constructor(private readonly personeelService: PersoneelService) {}

  // @Mutation(() => Personeel, { name: 'create personeel'})
  // createPersoneel(@Args('createPersoneelInput') createPersoneelInput: CreatePersoneelInput) {
  //   return this.personeelService.create(createPersoneelInput);
  // }

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

  @Query(() => Personeel, { name: 'personeelLid' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.personeelService.findOne(id)
  }

  // @Mutation(() => Personeel)
  // updatePersoneel(
  //   @Args('updatePersoneelInput') updatePersoneelInput: UpdatePersoneelInput,
  // ) {
  //   return this.personeelService.update(
  //     updatePersoneelInput.id,
  //     updatePersoneelInput,
  //   )
  // }

  @Mutation(() => Personeel)
  removePersoneel(@Args('id', { type: () => Int }) id: number) {
    return this.personeelService.remove(id)
  }
}
