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
import { UpdateAgendaInput } from './dto/update-agenda.input'
import { LineUp } from './entities/lineup.entity'

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

    let currentTime = new Date()

    // Add 30 minutes
    currentTime.setMinutes(currentTime.getMinutes() + 30)

    // Get the hours and minutes
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()

    // Format the hours and minutes as a string
    const deadline = `${hours}:${minutes}`

    // check in materiaal
    await this.materiaalService.checkMateriaal(materiaal.item, materiaal.aantal)

    const benodigdheden = currentArtiest.benodigdheden
    const itemExists = await benodigdheden.find(
      b => b.item.toLocaleLowerCase() === materiaal.item.toLocaleLowerCase(),
    )

    if (itemExists) {
      itemExists.aantal = itemExists.aantal + materiaal.aantal
      // return this.artiestRepository.save(currentArtiest)
    } else {
      const newbenodigdheden = new Benodigdheden()
      newbenodigdheden.item = materiaal.item
      newbenodigdheden.aantal = materiaal.aantal
      newbenodigdheden.categorie = materiaal.categorie
      newbenodigdheden.podium = currentArtiest.podium

      currentArtiest.benodigdheden = [
        ...currentArtiest.benodigdheden,
        newbenodigdheden,
      ]
    }

    const newTaak = new CreateTakenInput()
    newTaak.naam = `${currentArtiest.naam} heeft ${materiaal.item} nodig`
    newTaak.aantal = materiaal.aantal
    newTaak.category = materiaal.categorie
    newTaak.plaats = currentArtiest.podium
    newTaak.deadline = deadline
    newTaak.materiaal = materiaal.item

    const categorie = materiaal.categorie.toLocaleLowerCase()
    let type

    if (
      categorie === 'drinken' ||
      categorie === 'eten' ||
      categorie === 'toiletten' ||
      categorie === 'afval'
    ) {
      type = 'Loges'
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

    await this.takenService.create(newTaak)
    await this.artiestRepository.save(currentArtiest)

    return currentArtiest
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

  async UpdateAgenda(uid: string, agenda: UpdateAgendaInput) {
    const artiest = await this.findOneByUid(uid)
    // search for agenda item
    const agendaItem = artiest.agenda.find(a => a.id === agenda.id)
    // update agenda item
    agendaItem.taak = agenda.taak
    agendaItem.tijd = agenda.tijd
    agendaItem.podium = agenda.podium

    if (agendaItem.podium) {
      artiest.podium = agendaItem.podium
      // change all the agenda items to the new podium
      artiest.agenda.forEach(a => {
        a.podium = agenda.podium
      })
    }

    await this.artiestRepository.save(artiest)
    return 'agenda geupdate'
  }

  async getLineUp(): Promise<LineUp[]> {
    const artiesten = await this.artiestRepository.find()
    const lineUp = artiesten.map(a => {
      const agenda = a.agenda.find(a => a.taak === 'Optreden')
      return {
        naam: a.naam,
        podium: a.podium,
        tijd: agenda.tijd,
      }
    })
    return lineUp
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
