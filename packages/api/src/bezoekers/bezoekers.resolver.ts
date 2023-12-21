import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql'
import { BezoekersService } from './bezoekers.service'
import { Bezoeker } from './entities/bezoeker.entity'
import { CreateBezoekerInput } from './dto/create-bezoeker.input'
import {
  UpdateBezoekerInput,
  FavoArtiestInput,
} from './dto/update-bezoeker.input'
import { FavArtiest } from './entities/favartiest.entity'
import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard'
import { NotificationsGateway } from 'src/notifications/notifications.gateway'


@Resolver(() => Bezoeker)
export class BezoekersResolver {
  constructor(
    private readonly bezoekersService: BezoekersService, 
    private readonly gateway: NotificationsGateway
    ) {}

  @UseGuards(FirebaseGuard)
  @Mutation(() => Bezoeker, { description: 'Create a bezoeker using DTO' })
  createBezoeker(
    @Args('createBezoekerInput') createBezoekerInput: CreateBezoekerInput,
  ): Promise<Bezoeker> {
    return this.bezoekersService.create(createBezoekerInput)
  }


  @UseGuards(FirebaseGuard)
  @Query(() => Bezoeker, { name: 'bezoeker', nullable: true })
  findOneById(@Args('id') id: string): Promise<Bezoeker> {
    return this.bezoekersService.findOneById(id)
  }

  @UseGuards(FirebaseGuard)
  @Query(() => Bezoeker, { name: 'bezoekerByUid' })
  findOneByUid(
    @Args('uid', { type: () => String }) uid: string,
  ): Promise<Bezoeker> {
    return this.bezoekersService.findOneByUid(uid)
  }

  // @UseGuards(FirebaseGuard)
  @Query(() => [FavArtiest], { name: 'bezoekersFavorite' })
  findFavoArtiestsByUid(
    @Args('uid', { type: () => String }) uid: string,
  ): Promise<FavArtiest[]> {
    return this.bezoekersService.findFavoArtiestsByUid(uid)
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => Bezoeker)
  addFavoArtiestToBezoeker(
    @Args('uid', { type: () => String }) uid: string,
    @Args('favoartiest', { type: () => String }) favoartiest: string,
  ) {
    return this.bezoekersService.addFavoArtiest(uid, favoartiest)
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => Bezoeker)
  removeFavoArtiestFromBezoeker(
    @Args('uid', { type: () => String }) uid: string,
    @Args('favoartiest', { type: () => String }) favoartiest: string,
  ) {
    return this.bezoekersService.removeFavoArtiest(uid, favoartiest)
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => Bezoeker)
  addSaldoToBezoeker(
    @Args('uid', { type: () => String }) uid: string,
    @Args('saldo', { type: () => Float }) aantal: number,
  ) {
    return this.bezoekersService.addSaldo(uid, aantal)
  }

  // @UseGuards(FirebaseGuard)
  @Mutation(() => Bezoeker)
  removeSaldoFromBezoeker(
    @Args('uid', { type: () => String }) uid: string,
    @Args('saldo', { type: () => Float }) aantal: number,
    @Args('transactie', { type: () => String }) transactie: string,
  ) {
    this.gateway.changeSaldoBezoeker(transactie, aantal, uid)
    return this.bezoekersService.removeSaldo(uid, aantal, transactie)
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