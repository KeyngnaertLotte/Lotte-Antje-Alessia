import { Module } from '@nestjs/common';
import { PersoneelService } from './personeel.service';
import { PersoneelResolver } from './personeel.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personeel } from './entities/personeel.entity';
import { TakenModule } from 'src/taken/taken.module';
import { UsersModule } from 'src/users/users.module';
import { MateriaalModule } from 'src/materiaal/materiaal.module';

@Module({
  providers: [PersoneelResolver, PersoneelService],
  imports: [TypeOrmModule.forFeature([Personeel]), TakenModule, UsersModule, MateriaalModule],
  exports: [PersoneelService],
})
export class PersoneelModule {}
