import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { PersoneelService } from './personeel.service'
import { Personeel } from './entities/personeel.entity'
import { CreatePersoneelInput } from './dto/create-personeel.input'
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard'
import { FirebaseUser } from 'src/authentication/decoraters/user.decorator'
import { UserRecord } from 'firebase-admin/auth'
import { UseGuards } from '@nestjs/common'

@Resolver(() => Personeel)
export class PersoneelResolver {
  constructor(private readonly personeelService: PersoneelService) {}

  // create personeel
  @Mutation(() => Personeel)
  createPersoneel(
    @Args('createPersoneelInput') createPersoneelInput: CreatePersoneelInput,
  ): Promise<Personeel> {
    return this.personeelService.create(createPersoneelInput)
  }

  // get all personeel
  @Query(() => [Personeel], { name: 'personeel' })
  findAll() {
    return this.personeelService.findAll()
  }

  // get one personeel
  @Query(() => Personeel, { name: 'personeelLid', nullable: true })
  findOneById(@Args('id') id: string): Promise<Personeel> {
    return this.personeelService.findOneById(id)
  }

  // delete personeel
  @Mutation(() => Personeel)
  removePersoneel(@Args('id', { type: () => Int }) id: number) {
    return this.personeelService.remove(id)
  }
}
