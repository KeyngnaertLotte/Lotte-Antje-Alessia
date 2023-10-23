import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { TakenService } from './taken.service'
import { Taak } from './entities/taken.entity'
import { CreateTakenInput } from './dto/create-taken.input'
import { UpdateTakenInput } from './dto/update-taken.input'

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

  @Query(() => Taak, { name: 'taken' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.takenService.findOne(id)
  }

  @Mutation(() => Taak)
  updateTaken(@Args('updateTakenInput') updateTakenInput: UpdateTakenInput) {
    return this.takenService.update(updateTakenInput.id, updateTakenInput)
  }

  @Mutation(() => Taak)
  removeTaken(@Args('id', { type: () => Int }) id: number) {
    return this.takenService.remove(id)
  }

}
