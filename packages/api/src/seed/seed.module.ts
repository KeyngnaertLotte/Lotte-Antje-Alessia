import { Module } from '@nestjs/common';
import { ArtiestenModule } from 'src/artiesten/artiesten.module';
import { CommandModule } from 'nestjs-command'
import { BezoekersModule } from 'src/bezoekers/bezoekers.module';
import { PersoneelModule } from 'src/personeel/personeel.module';
import { SeedService } from './seed.service';
import { DatabaseSeedCommand } from './seed.command';
import { TakenModule } from 'src/taken/taken.module';

@Module({
    imports: [ArtiestenModule, BezoekersModule, PersoneelModule, TakenModule,CommandModule],
    providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}
