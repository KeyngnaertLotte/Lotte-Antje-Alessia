import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { TakenService } from './taken.service'
import { Taak } from './entities/taken.entity'
import { CreateTakenInput } from './dto/create-taken.input'
import { UpdateTakenInput } from './dto/update-taken.input'
import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard'
import { DeleteTakenInput } from './dto/delete-taken.input'
import { string } from 'yargs'

@Resolver(() => Taak)
export class TakenResolver {
  constructor(private readonly takenService: TakenService) {}

  // CREATE taak
  @UseGuards(FirebaseGuard)
  @Mutation(() => Taak)
  createTaak(@Args('createTakenInput') createTakenInput: CreateTakenInput) {
    return this.takenService.create(createTakenInput)
  }

  // GET alle taken
  @UseGuards(FirebaseGuard)
  @Query(() => [Taak], { name: 'taken' })
  findAll() {
    return this.takenService.findAll()
  }

  // GET taak by id
  @UseGuards(FirebaseGuard)
  @Query(() => Taak, { name: 'findOneById' })
  findOneById(@Args('id', { type: () => String }) id: string) {
    return this.takenService.findOneById(id)
  }

  // GET taak by type
  @UseGuards(FirebaseGuard)
  @Query(() => [Taak], { name: 'findByType' })
  findByType(@Args('type', { type: () => String }) type: string) {
    return this.takenService.findByType(type)
  }

  // PUT taak
  @UseGuards(FirebaseGuard)
  @Mutation(() => String)
  updateTakenStatus(@Args('id') id: string, @Args('status') status: boolean) {
    return this.takenService.update(id, status)
  }
}
