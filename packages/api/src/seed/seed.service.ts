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

@Injectable()
export class SeedService {
  constructor(
    private artiestenService: ArtiestenService, 
    private bezoekersService: BezoekersService,
    private personeelService: PersoneelService,
    ) {}

  async addArtiestenFromJson(): Promise<Artiest[]> {
    let deArtiesten: Artiest[] = []
    for (let artiest of artiesten) {
      const a = new Artiest()
      a.naam = artiest.naam
      a.podium = artiest.podium
      // a.agenda = artiest.agenda
      // for (let opdracht of artiest.agenda){
      //   a.agenda.push(opdracht)
      // }

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
      b.achternaam = bezoeker.achternaam
      b.voornaam = bezoeker.voornaam
      b.email = bezoeker.email
      b.saldo = bezoeker.saldo

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
      p.telefoon = personeelLid.telefoon

      hetPersoneel.push(p)
    }
    return this.personeelService.saveAll(hetPersoneel)
  }

  async deleteAllPersoneel(): Promise<void> {
    return this.personeelService.truncate()
  }

}
