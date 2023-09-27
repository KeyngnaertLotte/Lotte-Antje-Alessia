import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BezoekersService } from './bezoekers.service';
import { Bezoeker } from './entities/bezoeker.entity';
import { CreateBezoekerInput } from './dto/create-bezoeker.input';
import { UpdateBezoekerInput } from './dto/update-bezoeker.input';

@Resolver(() => Bezoeker)
export class BezoekersResolver {
  constructor(private readonly bezoekersService: BezoekersService) {}

  @Mutation(() => Bezoeker, { description: 'Create a bezoeker using DTO' })
  createBezoeker(@Args('createBezoekerInput') createBezoekerInput: CreateBezoekerInput): Promise<Bezoeker> {
    return this.bezoekersService.create(createBezoekerInput);
  }

  @Query(() => [Bezoeker], { name: 'bezoekers' })
  findAll() {
    return this.bezoekersService.findAll();
  }

  @Query(() => Bezoeker, { name: 'bezoeker', nullable: true })
  findOneById(@Args('id') id: string): Promise<Bezoeker> {
    return this.bezoekersService.findOneById(id);
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
