import { Module } from '@nestjs/common';
import { PersoneelService } from './personeel.service';
import { PersoneelResolver } from './personeel.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personeel } from './entities/personeel.entity';

@Module({
  providers: [PersoneelResolver, PersoneelService],
  imports: [TypeOrmModule.forFeature([Personeel])],

  exports: [PersoneelService],
})
export class PersoneelModule {}
