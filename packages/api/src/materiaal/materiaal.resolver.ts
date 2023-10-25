import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MateriaalService } from './materiaal.service';
import { Materiaal } from './entities/materiaal.entity';
import { CreateMateriaalInput } from './dto/create-materiaal.input';
import { UpdateMateriaalInput } from './dto/update-materiaal.input';

@Resolver(() => Materiaal)
export class MateriaalResolver {
  constructor(private readonly materiaalService: MateriaalService) {}

  @Mutation(() => Materiaal)
  createMateriaal(@Args('createMateriaalInput') createMateriaalInput: CreateMateriaalInput) {
    return this.materiaalService.create(createMateriaalInput);
  }

  @Query(() => [Materiaal], { name: 'materiaal' })
  findAll() {
    return this.materiaalService.findAll();
  }

  @Query(() => Materiaal, { name: 'materiaal' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.materiaalService.findOne(id);
  }

  @Mutation(() => Materiaal)
  updateMateriaal(@Args('updateMateriaalInput') updateMateriaalInput: UpdateMateriaalInput) {
    return this.materiaalService.update(updateMateriaalInput.id, updateMateriaalInput);
  }

  @Mutation(() => Materiaal)
  removeMateriaal(@Args('id', { type: () => Int }) id: number) {
    return this.materiaalService.remove(id);
  }
}
