import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { MateriaalService } from './materiaal.service'
import { Materiaal } from './entities/materiaal.entity'
import { CreateMateriaalInput } from './dto/create-materiaal.input'
import { UpdateMateriaalInput } from './dto/update-materiaal.input'
import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard'

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

  @UseGuards(FirebaseGuard)
  @Mutation(() => Materiaal)
  updateMateriaal(
    @Args('updateMateriaalInput') updateMateriaalInput: UpdateMateriaalInput,
  ) {
    return this.materiaalService.update(
      updateMateriaalInput.id,
      updateMateriaalInput,
    )
  }

  // @Mutation(() => Materiaal)
  // updateMateriaal(@Args('updateMateriaalInput') updateMateriaalInput: UpdateMateriaalInput) {
  //   return this.materiaalService.update(updateMateriaalInput.id, updateMateriaalInput.items, updateMateriaalInput);
  // }

  @UseGuards(FirebaseGuard)
  @Mutation(() => Materiaal)
  removeMateriaal(@Args('id', { type: () => Int }) id: number) {
    return this.materiaalService.remove(id)
  }

  @UseGuards(FirebaseGuard)
  @Query(() => [Materiaal], { name: 'categorie' })
  findAllCategories() {
    return this.materiaalService.findAllCategories()
  }
}
