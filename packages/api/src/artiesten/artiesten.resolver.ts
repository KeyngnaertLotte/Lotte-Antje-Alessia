import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ArtiestenService } from './artiesten.service'
import { Artiest } from './entities/artiesten.entity'
import { CreateArtiestenInput } from './dto/create-artiesten.input'
import { UpdateArtiestenInput } from './dto/update-artiesten.input'
import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard'
import { FirebaseUser } from 'src/authentication/decoraters/user.decorator'
import { UserRecord } from 'firebase-admin/auth'

@Resolver(() => Artiest)
export class ArtiestenResolver {
  constructor(private readonly artiestenService: ArtiestenService) {}

  @Mutation(() => Artiest)
  createArtiesten(
    @Args('createArtiestenInput') createArtiestenInput: CreateArtiestenInput,
  ): Promise<Artiest> {
    return this.artiestenService.create(createArtiestenInput)
  }

  @UseGuards(FirebaseGuard)
  @Query(() => [Artiest], { name: 'artiesten' })
  findAll(@FirebaseUser() currentUser: UserRecord) {
    console.log(currentUser)
    return this.artiestenService.findAll()
  }

  @Query(() => Artiest, { name: 'artiest', nullable: true })
  findOneById(@Args('id') id: string): Promise<Artiest> {
    return this.artiestenService.findOneById(id)
  }

  @Mutation(() => Artiest)
  updateArtiesten(
    @Args('updateArtiestenInput') updateArtiestenInput: UpdateArtiestenInput,
  ) {
    return this.artiestenService.update(
      updateArtiestenInput.id,
      updateArtiestenInput,
    )
  }

  @Mutation(() => Artiest)
  removeArtiesten(@Args('id', { type: () => Int }) id: number) {
    return this.artiestenService.remove(id)
  }
}
