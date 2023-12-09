import { Injectable } from '@nestjs/common'
import { ArtiestenService } from 'src/artiesten/artiesten.service'
import { Artiest } from 'src/artiesten/entities/artiesten.entity'
import { Bezoeker } from 'src/bezoekers/entities/bezoeker.entity'
import { BezoekersService } from 'src/bezoekers/bezoekers.service'
import { PersoneelService } from 'src/personeel/personeel.service'
import { Personeel } from 'src/personeel/entities/personeel.entity'

import * as artiesten from './data/artiesten.json'
import * as bezoekers from './data/bezoekers.json'
import * as personeel from './data/personeel.json'
import * as taken from './data/taken.json'
import * as materiaal from './data/materiaal.json'
import * as users from './data/users.json'
import { Taak } from 'src/taken/entities/taken.entity'
import { TakenService } from 'src/taken/taken.service'
import { Materiaal } from 'src/materiaal/entities/materiaal.entity'
import { MateriaalService } from 'src/materiaal/materiaal.service'
import { Role, User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class SeedService {
  constructor(
    private artiestenService: ArtiestenService,
    private bezoekersService: BezoekersService,
    private personeelService: PersoneelService,
    private materiaalService: MateriaalService,
    private usersService: UsersService,
    private taakService: TakenService,
  ) {}

  async addArtiestenFromJson(): Promise<Artiest[]> {
    let deArtiesten: Artiest[] = []
    for (let artiest of artiesten) {
      const a = new Artiest()
      a.naam = artiest.naam
      a.podium = artiest.podium
      a.uid = artiest.uid
      a.benodigdheden = artiest.benodigdheden
      a.agenda = artiest.agenda
      deArtiesten.push(a)
    }
    return this.artiestenService.saveAll(deArtiesten)
  }

  async deleteAllArtiesten(): Promise<void> {
    return this.artiestenService.truncate()
  }

  async addBezoekersFromJson(): Promise<Bezoeker[]> {
    let deBezoekers: Bezoeker[] = []
    for (let bezoeker of bezoekers) {
      const b = new Bezoeker()
      b.uid = bezoeker.uid
      b.naam = bezoeker.naam
      b.saldo = bezoeker.saldo
      b.favoartiest = bezoeker.favoartiest
      b.transacties = bezoeker.transacties

      deBezoekers.push(b)
    }
    return this.bezoekersService.saveAll(deBezoekers)
  }

  async deleteAllBezoekers(): Promise<void> {
    return this.bezoekersService.truncate()
  }

  async addPersoneelFromJson(): Promise<Personeel[]> {
    let hetPersoneel: Personeel[] = []
    for (let personeelLid of personeel) {
      const p = new Personeel()
      p.achternaam = personeelLid.achternaam
      p.voornaam = personeelLid.voornaam
      p.uid = personeelLid.uid
      p.type = personeelLid.type
      p.takenlijst = personeelLid.takenlijst

      hetPersoneel.push(p)
    }
    return this.personeelService.saveAll(hetPersoneel)
  }

  async deleteAllPersoneel(): Promise<void> {
    return this.personeelService.truncate()
  }

  async addTakenFromJson(): Promise<Taak[]> {
    let deTaken: Taak[] = []
    for (let taak of taken) {
      const t = new Taak()
      t.aantal = taak.aantal
      t.category = taak.category
      t.deadline = taak.deadline
      t.naam = taak.naam
      t.plaats = taak.plaats
      t.type = taak.type
      t.materiaal = taak.materiaal
      t.status = taak.status

      deTaken.push(t)
    }
    return this.taakService.saveAll(deTaken)
  }

  async deleteAllTaken(): Promise<void> {
    return this.taakService.truncate()
  }

  async addMateriaalFromJson(): Promise<Materiaal[]> {
    // TODO
    let hetMateriaal: Materiaal[] = []
    for (let materiaalItem of materiaal) {
      const m = new Materiaal()
      m.item = materiaalItem.item
      m.categorie = materiaalItem.categorie
      m.aantal = materiaalItem.aantal

      hetMateriaal.push(m)
    }
    return this.materiaalService.saveAll(hetMateriaal)
  }

  async deleteAllMateriaal(): Promise<void> {
    return this.materiaalService.truncate()
  }

  async addUserFromJson(): Promise<User[]> {
    let deUsers: User[] = []
    for (let user of users) {
      const rol = user.role.toLocaleUpperCase() as Role
      const u = new User()
      u.uid = user.uid
      u.locale = user.locale
      u.role = rol
      u.naam = user.naam

      deUsers.push(u)
    }
    return this.usersService.saveAll(deUsers)
  }

  async deleteAllUsers(): Promise<void> {
    return this.usersService.truncate()
  }
}
