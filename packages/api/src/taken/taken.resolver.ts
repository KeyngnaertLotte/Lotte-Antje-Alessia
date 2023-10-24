import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { TakenService } from './taken.service'
import { Taak } from './entities/taken.entity'
import { CreateTakenInput } from './dto/create-taken.input'
import { UpdateTakenInput } from './dto/update-taken.input'
import { query } from 'express'

@Resolver(() => Taak)
export class TakenResolver {
  constructor(private readonly takenService: TakenService) {}

  @Mutation(() => Taak)
  createTaken(@Args('createTakenInput') createTakenInput: CreateTakenInput) {
    return this.takenService.create(createTakenInput)
  }

  @Query(() => [Taak], { name: 'taken' })
  findAll() {
    return this.takenService.findAll()
  }

  // @Query(() => Taak, { name: 'taak' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.takenService.findOne(id)
  // }

  @Query(() => Taak, { name: 'taak' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.takenService.findOneById(id)
  }

  // @Query(() => Taak, { name: 'taakbyid' })
  // async findOneById(@Args('id', { type: () => String }) id: string) {
  //   console.log('id (resolver)', id)
  //   console.log('test',await this.takenService.findOneById(id))
  //   return await this.takenService.findOneById(id)
  // }

  @Mutation(() => Taak)
  updateTaken(@Args('updateTakenInput') updateTakenInput: UpdateTakenInput) {
    return this.takenService.update(updateTakenInput.id, updateTakenInput)
  }

  @Mutation(() => Taak)
  removeTaak(@Args('id', { type: () => String }) id: string) {
    return this.takenService.remove(id)
  }
}
