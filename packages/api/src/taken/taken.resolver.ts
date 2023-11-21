import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { TakenService } from './taken.service'
import { Taak } from './entities/taken.entity'
import { CreateTakenInput } from './dto/create-taken.input'
import { UpdateTakenInput } from './dto/update-taken.input'
import { query } from 'express'
import { DeleteTakenInput } from './dto/delete-taken.input'

@Resolver(() => Taak)
export class TakenResolver {
  constructor(private readonly takenService: TakenService) {}

  @Mutation(() => Taak)
  createTaak(@Args('createTakenInput') createTakenInput: CreateTakenInput) {
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

  @Query(() => [Taak], { name: 'findByType' })
  findByType(@Args('type', { type: () => String }) type: string) {
    return this.takenService.findByType(type)
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

  // @Mutation(() => Taak)
  // deleteTaken(@Args('id', { type: () => Int }) id: number) {
  //   return this.takenService.delete(id)
  // }
}
