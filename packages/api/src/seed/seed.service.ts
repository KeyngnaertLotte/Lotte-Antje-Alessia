import { Injectable } from '@nestjs/common'
import { ArtiestenService } from 'src/artiesten/artiesten.service'
import { Artiesten } from 'src/artiesten/entities/artiesten.entity'
import { Bezoeker } from 'src/bezoekers/entities/bezoeker.entity'
import { BezoekersService } from 'src/bezoekers/bezoekers.service'

import * as artiesten from './data/artiesten.json'
import * as bezoekers from './data/bezoekers.json'

@Injectable()
export class SeedService {
  constructor(
    private artiestenService: ArtiestenService, 
    private bezoekersService: BezoekersService
    ) {}

  async addArtiestenFromJson(): Promise<Artiesten[]> {
    let deArtiesten: Artiesten[] = []
    for (let artiest of artiesten) {
      const a = new Artiesten()
      a.naam = artiest.naam
      a.podium = artiest.podium

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

}
