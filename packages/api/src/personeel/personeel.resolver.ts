import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { PersoneelService } from './personeel.service'

import { Personeel } from './entities/personeel.entity'
import { Takenlijst } from './entities/task.entity'
import { CreatePersoneelInput } from './dto/create-personeel.input'
import { CreateTaakInput } from './dto/create-taak.input'
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard'
import { FirebaseUser } from 'src/authentication/decoraters/user.decorator'
import { UserRecord } from 'firebase-admin/auth'
import { UseGuards } from '@nestjs/common'
import { UpdatePersoneelInput } from './dto/update-personeel.input'

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

  // create takenlijst
  @Mutation(() => Personeel, { name: 'createTaakInput' })
  createTaakInput(
    @Args('createTaakInput')
    createTaakInput: CreateTaakInput,
    @Args('uid') uid: string,
  ) {
    return this.personeelService.AddTaakToPersoneel(uid, createTaakInput)
  }

  @Mutation(() => Personeel, { name: 'updateType' })
  UpdateType(
    @Args('updateTypeInput')
    updateTypeInput: string,
    @Args('uid') uid: string,
  ) {
    return this.personeelService.UpdateType(uid, updateTypeInput)
  }

  // get all personeel
  // @UseGuards(FirebaseGuard)
  @Query(() => [Personeel], { name: 'personeel' })
  findAll(@FirebaseUser() currentUser: UserRecord) {
    console.log(currentUser)
    return this.personeelService.findAll()
  }

  // get one personeelslid
  @Query(() => Personeel, { name: 'personeelLid', nullable: true })
  findOneById(@Args('id') id: string): Promise<Personeel> {
    return this.personeelService.findOneById(id)
  }

  // get one by uid
  @Query(() => Personeel, { name: 'personeelByUid' })
  findOneByUid(
    @Args('uid', { type: () => String }) uid: string,
  ): Promise<Personeel> {
    return this.personeelService.findOneByUid(uid)
  }

  // update personeel
  // @Mutation(() => Personeel)
  // updatePersoneel(
  //   @Args('updatePersoneelInput') updatePersoneelInput: UpdatePersoneelInput,
  // ) {
  //   return this.personeelService.update(
  //     updatePersoneelInput.id,
  //     updatePersoneelInput,
  //   )
  // }

  // delete personeel
  // @Mutation(() => Personeel)
  // removePersoneel(@Args('id', { type: () => Int }) id: number) {
  //   return this.personeelService.remove(id)
  // }
}
