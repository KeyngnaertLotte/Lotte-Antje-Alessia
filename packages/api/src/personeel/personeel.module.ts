import { Module } from '@nestjs/common';
import { PersoneelService } from './personeel.service';
import { PersoneelResolver } from './personeel.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personeel } from './entities/personeel.entity';
import { TakenModule } from 'src/taken/taken.module';

@Module({
  providers: [PersoneelResolver, PersoneelService],
  imports: [TypeOrmModule.forFeature([Personeel]), TakenModule],
  exports: [PersoneelService],
})
export class PersoneelModule {}
