import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BezoekersService } from './bezoekers.service';
import { Bezoeker } from './entities/bezoeker.entity';
import { CreateBezoekerInput } from './dto/create-bezoeker.input';
import { UpdateBezoekerInput, FavoArtiestInput } from './dto/update-bezoeker.input';
import { FavArtiest } from './entities/favartiest.entity';

@Resolver(() => Bezoeker)
export class BezoekersResolver {
  constructor(private readonly bezoekersService: BezoekersService) {}

  @Mutation(() => Bezoeker, { description: 'Create a bezoeker using DTO' })
  createBezoeker(@Args('createBezoekerInput') createBezoekerInput: CreateBezoekerInput): Promise<Bezoeker> {
    return this.bezoekersService.create(createBezoekerInput);
  }

  // @Query(() => [Bezoeker], { name: 'bezoekers' })
  // findAll() {
  //   return this.bezoekersService.findAll();
  // }

  @Query(() => Bezoeker, { name: 'bezoeker', nullable: true })
  findOneById(@Args('id') id: string): Promise<Bezoeker> {
    return this.bezoekersService.findOneById(id);
  }


  @Query(() => Bezoeker, { name: 'bezoekerByUid' })
  findOneByUid(@Args('uid', { type: () => String }) uid: string): Promise<Bezoeker> {
    return this.bezoekersService.findOneByUid(uid);
  }

  @Query(() => [FavArtiest], { name: 'bezoekersFavorite' })
  findFavoArtiestsByUid(@Args('uid', { type: () => String }) uid: string): Promise<FavArtiest[]> {
    return this.bezoekersService.findFavoArtiestsByUid(uid);
  }

  @Mutation(() => Bezoeker)
  addFavoArtiestToBezoeker(@Args('uid', { type: () => String }) uid: string, @Args('favoartiest', { type: () => String }) favoartiest: string) {
    return this.bezoekersService.addFavoArtiest(uid, favoartiest);
  }

  @Mutation(() => Bezoeker)
  removeFavoArtiestFromBezoeker(@Args('uid', { type: () => String }) uid: string, @Args('favoartiest', { type: () => String }) favoartiest: string) {
    return this.bezoekersService.removeFavoArtiest(uid, favoartiest);
  }

  

  // @Mutation(() => Bezoeker)
  // updateBezoeker(@Args('updateBezoekerInput') updateBezoekerInput: UpdateBezoekerInput) {
  //   return this.bezoekersService.update(updateBezoekerInput.id, updateBezoekerInput);
  // }

  // @Mutation(() => Bezoeker)
  // removeBezoeker(@Args('id', { type: () => Int }) id: number) {
  //   return this.bezoekersService.remove(id);
  // }
}


// web shop met spacial music?

// via tekening ai beweging maken

// hoe bouw je een realtime animatie generator aan de hand van animejs en chatgpt
