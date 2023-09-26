import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PersoneelService } from './personeel.service';
import { Personeel } from './entities/personeel.entity';
import { CreatePersoneelInput } from './dto/create-personeel.input';
import { UpdatePersoneelInput } from './dto/update-personeel.input';

@Resolver(() => Personeel)
export class PersoneelResolver {
  constructor(private readonly personeelService: PersoneelService) {}

  @Mutation(() => Personeel)
  createPersoneel(@Args('createPersoneelInput') createPersoneelInput: CreatePersoneelInput) {
    return this.personeelService.create(createPersoneelInput);
  }

  @Query(() => [Personeel], { name: 'personeel' })
  findAll() {
    // return this.personeelService.findAll();
    return [
      {
        id: '1',
        name: 'Duif',
        fullname: 'Duif',
        category: 'Roekoes',
        url: 'test',
        observations: 1,
        description: 'test',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
  }

  @Query(() => Personeel, { name: 'personeel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.personeelService.findOne(id);
  }

  @Mutation(() => Personeel)
  updatePersoneel(@Args('updatePersoneelInput') updatePersoneelInput: UpdatePersoneelInput) {
    return this.personeelService.update(updatePersoneelInput.id, updatePersoneelInput);
  }

  @Mutation(() => Personeel)
  removePersoneel(@Args('id', { type: () => Int }) id: number) {
    return this.personeelService.remove(id);
  }
}
