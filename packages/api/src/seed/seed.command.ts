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

  @Command({
    command: 'seed:database:taak',
    describe: 'seed the database with taak',
  })
  async seedTaken() {
    console.info('seeding taken')
    const taken = await this.seedService.addTakenFromJson()
    console.info(`Seeded ${taken.length} taken`)
  }

  @Command({
    command: 'seed:reset:taak',
    describe: 'delete all data from the taak table',
  })
  async deleteTaken() {
    console.info('deleting taken')
    await this.seedService.deleteAllTaken()
    console.info('deleted taken')
  }

  @Command({
    command: 'seed:database:materiaal',
    describe: 'seed the database with materiaal',
  })
  async seedMateriaal() {
    console.info('seeding materiaal')
    const materiaal = await this.seedService.addMateriaalFromJson()
    console.info(`Seeded ${materiaal.length} materiaal`)
  }

  @Command({
    command: 'seed:reset:materiaal',
    describe: 'delete all data from the materiaal table',
  })
  async deleteMateriaal() {
    console.info('deleting materiaal')
    await this.seedService.deleteAllMateriaal()
    console.info('deleted materiaal')
  }

  @Command({
    command: 'seed:database:users',
    describe: 'seed the database with users',
  })
  async seedUsers() {
    console.info('seeding users')
    const users = await this.seedService.addUserFromJson()
    console.info(`Seeded ${users.length} users`)
  }

  @Command({
    command: 'seed:reset:users',
    describe: 'delete all data from the users table',
  })
  async deleteUsers() {
    console.info('deleting users')
    await this.seedService.deleteAllUsers()
    console.info('deleted users')
  }
}
