import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ArtiestenService } from './artiesten.service'
import { Artiesten } from './entities/artiesten.entity'
import { CreateArtiestenInput } from './dto/create-artiesten.input'
import { UpdateArtiestenInput } from './dto/update-artiesten.input'

@Resolver(() => Artiesten)
export class ArtiestenResolver {
  constructor(private readonly artiestenService: ArtiestenService) {}

  @Mutation(() => Artiesten)
  createArtiesten(
    @Args('createArtiestenInput') createArtiestenInput: CreateArtiestenInput,
  ): Promise<Artiesten> {
    return this.artiestenService.create(createArtiestenInput)
  }

  @Query(() => [Artiesten], { name: 'artiesten' })
  findAll() {
    // return [
    //   {
    //     id: '1',
    //     name: 'Be Right Back',
    //     stage: 'Antje'
    //   },
    // ]
    return this.artiestenService.findAll()
  }

  @Query(() => Artiesten, { name: 'artiest', nullable: true })
  findOneById(@Args('id') id: string): Promise<Artiesten> {
    return this.artiestenService.findOneById(id)
  }

  @Mutation(() => Artiesten)
  updateArtiesten(
    @Args('updateArtiestenInput') updateArtiestenInput: UpdateArtiestenInput,
  ) {
    return this.artiestenService.update(
      updateArtiestenInput.id,
      updateArtiestenInput,
    )
  }

  @Mutation(() => Artiesten)
  removeArtiesten(@Args('id', { type: () => Int }) id: number) {
    return this.artiestenService.remove(id)
  }
}
