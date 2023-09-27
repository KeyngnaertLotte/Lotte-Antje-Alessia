import { Module } from '@nestjs/common';
import { ArtiestenModule } from 'src/artiesten/artiesten.module';
import { CommandModule } from 'nestjs-command'
import { BezoekersModule } from 'src/bezoekers/bezoekers.module';
import { PersoneelModule } from 'src/personeel/personeel.module';
import { SeedService } from './seed.service';

@Module({
    imports: [ArtiestenModule, BezoekersModule, PersoneelModule, CommandModule],
    providers: [SeedService],

})
export class SeedModule {}
