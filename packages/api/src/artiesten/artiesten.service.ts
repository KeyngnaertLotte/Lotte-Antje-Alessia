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

@Injectable()
export class ArtiestenService {
  constructor(
    @InjectRepository(Artiest)
    private readonly artiestRepository: Repository<Artiest>,
    private readonly materiaalService: MateriaalService,
    private readonly takenService: TakenService,
    private readonly createTakenInput: CreateTakenInput,
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

    if (categorie === 'drank' || categorie === 'eten') {
      type = 'loges'
    }
    if (categorie === 'geluid' || categorie === 'instrument') {
      type = 'Podium - geluid'
    }
    if (categorie === 'licht') {
      type = 'Podium - licht'
    }
    if (categorie === 'andere') {
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
    return this.artiestRepository.findOneByOrFail({ uid })
  }

  update(id: number, updateArtiestenInput: UpdateArtiestenInput) {
    return `This action updates a #${id} artiesten`
  }

  remove(id: number) {
    return `This action removes a #${id} artiesten`
  }

  saveAll(artiesten: Artiest[]) {
    return this.artiestRepository.save(artiesten)
  }

  truncate() {
    return this.artiestRepository.clear()
  }
}
