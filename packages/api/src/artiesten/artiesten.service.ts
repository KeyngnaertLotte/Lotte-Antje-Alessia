import { Injectable } from '@nestjs/common'
import { CreateArtiestenInput } from './dto/create-artiesten.input'
import { UpdateArtiestenInput } from './dto/update-artiesten.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Artiest } from './entities/artiesten.entity'
import { ObjectId } from 'mongodb'
import { Agenda } from './entities/agenda.entity'
import { Benodigdheden } from './entities/benodigdheden.entity'
import { CreateBenodigdhedenInput } from './dto/create-benodigdheden.input'
import { MateriaalService } from 'src/materiaal/materiaal.service'
import { TakenService } from 'src/taken/taken.service'
import { CreateTakenInput } from 'src/taken/dto/create-taken.input'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class ArtiestenService {
  constructor(
    @InjectRepository(Artiest)
    private readonly artiestRepository: Repository<Artiest>,
    private readonly materiaalService: MateriaalService,
    private readonly takenService: TakenService,
    private readonly usersService: UsersService,
  ) {}

  async create(createArtiestenInput: CreateArtiestenInput): Promise<Artiest> {
    const a = new Artiest()
    a.naam = createArtiestenInput.naam
    a.uid = createArtiestenInput.uid
    return this.artiestRepository.save(a)
  }

  async AddMateriaaltoArtiest(
    uid: string,
    materiaal: CreateBenodigdhedenInput,
  ) {
    const currentArtiest = await this.findOneByUid(uid)

    // check in materiaal
    await this.materiaalService.checkMateriaal(materiaal.item, materiaal.aantal)

    const benodigdheden = currentArtiest.benodigdheden
    const itemExists = await benodigdheden.find(
      b => b.item.toLocaleLowerCase() === materiaal.item.toLocaleLowerCase(),
    )

    if (itemExists) {
      console.log('item exists', itemExists)
      itemExists.aantal = itemExists.aantal + materiaal.aantal
      // return this.artiestRepository.save(currentArtiest)
    } else {
      const newbenodigdheden = new Benodigdheden()
      newbenodigdheden.item = materiaal.item
      newbenodigdheden.aantal = materiaal.aantal
      newbenodigdheden.categorie = materiaal.categorie
      newbenodigdheden.podium = currentArtiest.podium
      newbenodigdheden.deadline = materiaal.deadline

      currentArtiest.benodigdheden = [
        ...currentArtiest.benodigdheden,
        newbenodigdheden,
      ]
    }

    const newTaak = new CreateTakenInput()
    newTaak.naam = materiaal.item
    newTaak.aantal = materiaal.aantal
    newTaak.category = materiaal.categorie
    newTaak.plaats = currentArtiest.podium
    newTaak.deadline = materiaal.deadline

    const categorie = materiaal.categorie.toLocaleLowerCase()
    let type

    if (
      categorie === 'drinken' ||
      categorie === 'eten' ||
      categorie === 'toiletten' ||
      categorie === 'afval'
    ) {
      type = 'loges'
    }
    if (categorie === 'geluid' || categorie === 'instrumenten') {
      type = 'Podium - geluid'
    }
    if (
      categorie === 'verlichting' ||
      categorie === 'podium' ||
      categorie === 'elektriciteit' ||
      categorie === 'decoratie'
    ) {
      type = 'Podium - licht'
    }
    if (categorie === 'beveiliging' || categorie === 'ehbo') {
      type = 'Allround'
    }
    newTaak.type = type

    console.log(newTaak)

    await this.takenService.create(newTaak)

    return this.artiestRepository.save(currentArtiest)
  }

  findAll() {
    return this.artiestRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} artiesten`
  }

  findOneById(id: string): Promise<Artiest> {
    const obj = new ObjectId(id)
    // @ts-ignore
    return this.artiestRepository.findOne({ _id: new ObjectId(id) })
  }

  findOneByUid(uid: string) {
    return this.artiestRepository.findOne({ where: { uid } })
  }

  async update(uid: string, updateArtiestenInput: UpdateArtiestenInput) {
    // update artiest
    const artiest = this.findOneByUid(uid)
    await artiest.then(a => {
      a.naam = updateArtiestenInput?.naam
      a.podium = updateArtiestenInput?.podium
      return this.artiestRepository.save(a)
    })

    const naam = updateArtiestenInput?.naam
    if (naam) {
      await this.usersService.updateNaam(uid, naam)
    }

    return `artiest met uid ${uid} geupdate`
  }

  async remove(uid: string) {
    const artiest = await this.findOneByUid(uid)
    await this.artiestRepository.remove(artiest)
    await this.usersService.remove(uid)
    return 'user en artiest verwijderd'
  }

  saveAll(artiesten: Artiest[]) {
    return this.artiestRepository.save(artiesten)
  }

  truncate() {
    return this.artiestRepository.clear()
  }
}
