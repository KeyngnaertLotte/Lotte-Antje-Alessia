import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { MateriaalService } from './materiaal.service'
import { Materiaal } from './entities/materiaal.entity'
import { CreateMateriaalInput } from './dto/create-materiaal.input'
import { UpdateMateriaalInput } from './dto/update-materiaal.input'
import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard'
import { UpdateTakenInput } from 'src/taken/dto/update-taken.input'

@Resolver(() => Materiaal)
export class MateriaalResolver {
  constructor(private readonly materiaalService: MateriaalService) {}

  @UseGuards(FirebaseGuard)
  @Mutation(() => Materiaal)
  createMateriaal(
    @Args('createMateriaalInput') createMateriaalInput: CreateMateriaalInput,
  ) {
    return this.materiaalService.create(createMateriaalInput)
  }

  @UseGuards(FirebaseGuard)
  @Query(() => [Materiaal], { name: 'materiaal' })
  findAll() {
    return this.materiaalService.findAll()
  }

  // // geeft problemen wanneer uit commentaar
  // @Query(() => Materiaal, { name: 'materiaal' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.materiaalService.findOne(id);
  // }

  @UseGuards(FirebaseGuard)
  @Query(() => [Materiaal])
  findByCategorie(@Args('categorie') categorie: string) {
    return this.materiaalService.findByCategorie(categorie)
  }

  // @Mutation(() => Materiaal)
  // updateMateriaal(@Args('updateMateriaalInput') updateMateriaalInput: UpdateMateriaalInput) {
  //   return this.materiaalService.update(updateMateriaalInput.id, updateMateriaalInput.items, updateMateriaalInput);
  // }

  @UseGuards(FirebaseGuard)
  @Query(() => [Materiaal], { name: 'categorie' })
  findAllCategories() {
    return this.materiaalService.findAllCategories()
  }

  // @UseGuards(FirebaseGuard)
  @Mutation(() => String)
  removeTaak(@Args('id', { type: () => String }) id: string) {
    return this.materiaalService.remove(id)
  }

  @Mutation(() => String)
  updateTaken(
    @Args('updateTakenInput') updateTakenInput: UpdateTakenInput,
    @Args('id') id: string,
  ) {
    return this.materiaalService.updateTaak(id, updateTakenInput)
  }
}
