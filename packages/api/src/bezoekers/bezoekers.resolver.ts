import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BezoekersService } from './bezoekers.service';
import { Bezoeker } from './entities/bezoeker.entity';
import { CreateBezoekerInput } from './dto/create-bezoeker.input';
import { UpdateBezoekerInput } from './dto/update-bezoeker.input';

@Resolver(() => Bezoeker)
export class BezoekersResolver {
  constructor(private readonly bezoekersService: BezoekersService) {}

  @Mutation(() => Bezoeker)
  createBezoeker(@Args('createBezoekerInput') createBezoekerInput: CreateBezoekerInput) {
    return this.bezoekersService.create(createBezoekerInput);
  }

  @Query(() => [Bezoeker], { name: 'bezoekers' })
  findAll() {
    return this.bezoekersService.findAll();
  }

  @Query(() => Bezoeker, { name: 'bezoeker' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.bezoekersService.findOne(id);
  }

  @Mutation(() => Bezoeker)
  updateBezoeker(@Args('updateBezoekerInput') updateBezoekerInput: UpdateBezoekerInput) {
    return this.bezoekersService.update(updateBezoekerInput.id, updateBezoekerInput);
  }

  @Mutation(() => Bezoeker)
  removeBezoeker(@Args('id', { type: () => Int }) id: number) {
    return this.bezoekersService.remove(id);
  }
}
