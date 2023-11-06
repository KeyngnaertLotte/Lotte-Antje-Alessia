import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ArtiestenService } from './artiesten.service'
import { Artiest } from './entities/artiesten.entity'
import { CreateArtiestenInput } from './dto/create-artiesten.input'
import { UpdateArtiestenInput } from './dto/update-artiesten.input'
import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard'
import { FirebaseUser } from 'src/authentication/decoraters/user.decorator'
import { UserRecord } from 'firebase-admin/auth'
import { Agenda } from './entities/agenda.entity'
import { CreateBenodigdhedenInput } from './dto/create-benodigdheden.input'

@Resolver(() => Artiest)
export class ArtiestenResolver {
  constructor(private readonly artiestenService: ArtiestenService) {}

  @Mutation(() => Artiest)
  createArtiesten(
    @Args('createArtiestenInput') createArtiestenInput: CreateArtiestenInput,
  ): Promise<Artiest> {
    return this.artiestenService.create(createArtiestenInput)
  }

  // @Mutation(() => Artiest)
  // createAgendaItem(
  //   @Args('createArtiestenInput') uid: string,
  // ): Promise<Artiest> {

  // }

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

  @Query(() => Artiest, { name: 'artiestByUid' })
  findOneByUid(@Args('string', { type: () => String }) id: string) {
    return this.artiestenService.findOneByUid(id)
  }


  // @Mutation(() => Artiest)
  // updateArtiesten(
  //   @Args('updateArtiestenInput') updateArtiestenInput: UpdateArtiestenInput,
  // ) {
  //   return this.artiestenService.update(
  //     updateArtiestenInput.id,
  //     updateArtiestenInput,
  //   )
  // }

  @Mutation(() => Artiest)
  createBenodigdhedenInput(
    @Args('createBenodigdhedenInput')
    createBenodigdhedenInput: CreateBenodigdhedenInput,
    @Args('uid') uid: string,
  ) {
    return this.artiestenService.AddMateriaaltoArtiest(
      uid,
      createBenodigdhedenInput,
    )
  }

  @Mutation(() => Artiest)
  removeArtiesten(@Args('id', { type: () => Int }) id: number) {
    return this.artiestenService.remove(id)
  }
}
