import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ArtiestenService } from './artiesten.service'
import { Artiest } from './entities/artiesten.entity'
import { CreateArtiestenInput } from './dto/create-artiesten.input'
import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard'
import { FirebaseUser } from 'src/authentication/decoraters/user.decorator'
import { UserRecord } from 'firebase-admin/auth'
import { CreateBenodigdhedenInput } from './dto/create-benodigdheden.input'
import { UpdateArtiestenInput } from './dto/update-artiesten.input'
import { Agenda } from './entities/agenda.entity'
import { UpdateAgendaInput } from './dto/update-agenda.input'
import { LineUp } from './entities/lineup.entity'

@Resolver(() => Artiest)
export class ArtiestenResolver {
  constructor(private readonly artiestenService: ArtiestenService) {}

  @UseGuards(FirebaseGuard)
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

  @UseGuards(FirebaseGuard)
  @Query(() => Artiest, { name: 'artiest', nullable: true })
  findOneById(@Args('id') id: string): Promise<Artiest> {
    return this.artiestenService.findOneById(id)
  }

  @UseGuards(FirebaseGuard)
  @Query(() => Artiest, { name: 'artiestByUid' })
  findOneByUid(@Args('string', { type: () => String }) id: string) {
    return this.artiestenService.findOneByUid(id)
  }

  @UseGuards(FirebaseGuard)
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

  @UseGuards(FirebaseGuard)
  @Mutation(() => String)
  removeArtiesten(@Args('string', { type: () => String }) uid: string) {
    return this.artiestenService.remove(uid)
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => String)
  updateArtiesten(
    @Args('updateArtiestenInput') updateArtiestenInput: UpdateArtiestenInput,
    @Args('uid') uid: string,
  ) {
    return this.artiestenService.update(uid, updateArtiestenInput)
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => String)
  UpdateAgenda(
    @Args('AgendaInput') agendaInput: UpdateAgendaInput,
    @Args('uid') uid: string,
  ) {
    return this.artiestenService.UpdateAgenda(uid,agendaInput)
  }

  @Query(() => [LineUp], { name: 'lineUp' })
  GetLineUp() {
    return this.artiestenService.getLineUp()
  }
}
