import { Injectable } from '@nestjs/common'
import { ArtiestenService } from 'src/artiesten/artiesten.service'
import { Artiesten } from 'src/artiesten/entities/artiesten.entity'

import * as artiesten from './data/artiesten.json'

@Injectable()
export class SeedService {
  constructor(private artiestenService: ArtiestenService) {}

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
}
