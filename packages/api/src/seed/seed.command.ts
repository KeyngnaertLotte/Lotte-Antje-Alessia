import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private seedService: SeedService) {}

  @Command({
    command: 'seed:database:artiesten',
    describe: 'seed the database with artiesten',
  })
  async seedArtiesten() {
    console.info('seeding artiesten')
    const artiesten = await this.seedService.addArtiestenFromJson()
    console.info(`Seeded ${artiesten.length} artiesten`)
  }

  @Command({
    command: 'seed:reset:artiesten',
    describe: 'delete all data from the artiesten table',
  })
  async deleteArtiesten() {
    console.info('deleting artiesten')
    await this.seedService.deleteAllArtiesten()
    console.info('deleted artiesten')
  }

  @Command({
    command: 'seed:database:bezoekers',
    describe: 'seed the database with bezoekers',
  })
  async seedBezoekers() {
    console.info('seeding bezoekers')
    const bezoekers = await this.seedService.addBezoekersFromJson()
    console.info(`Seeded ${bezoekers.length} bezoekers`)
  }

  @Command({
    command: 'seed:reset:bezoekers',
    describe: 'delete all data from the bezoekers table',
  })
  async deleteBezoekers() {
    console.info('deleting bezoekers')
    await this.seedService.deleteAllBezoekers()
    console.info('deleted bezoekers')
  }

  @Command({
    command: 'seed:database:personeel',
    describe: 'seed the database with personeel',
  })
  async seedPersoneel() {
    console.info('seeding personeel')
    const personeel = await this.seedService.addPersoneelFromJson()
    console.info(`Seeded ${personeel.length} personeel`)
  }

  @Command({
    command: 'seed:reset:personeel',
    describe: 'delete all data from the personeel table',
  })
  async deletePersoneel() {
    console.info('deleting personeel')
    await this.seedService.deleteAllPersoneel()
    console.info('deleted personeel')
  }

}
