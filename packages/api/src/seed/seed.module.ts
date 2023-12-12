import { Module } from '@nestjs/common'
import { ArtiestenModule } from 'src/artiesten/artiesten.module'
import { CommandModule } from 'nestjs-command'
import { BezoekersModule } from 'src/bezoekers/bezoekers.module'
import { PersoneelModule } from 'src/personeel/personeel.module'
import { SeedService } from './seed.service'
import { DatabaseSeedCommand } from './seed.command'
import { TakenModule } from 'src/taken/taken.module'
import { MateriaalModule } from 'src/materiaal/materiaal.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    ArtiestenModule,
    BezoekersModule,
    PersoneelModule,
    TakenModule,
    CommandModule,
    MateriaalModule,
    UsersModule,
  ],
  providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {
  async seedE2ETestDB() {
    console.debug('E2E_TEST running, seeding database')
    await this.seedService.addArtiestenFromJson()
    await this.seedService.addBezoekersFromJson()
    await this.seedService.addPersoneelFromJson()
    await this.seedService.addTakenFromJson()
    await this.seedService.addMateriaalFromJson()
    await this.seedService.addUserFromJson()
  }

  constructor(private readonly seedService: SeedService) {
    // A spy is obviously better than an if-statement
    if (process.env.FIREBASE_AUTH_EMULATOR_HOST) this.seedE2ETestDB()
  }
}
