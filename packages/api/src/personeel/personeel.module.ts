import { Module } from '@nestjs/common';
import { PersoneelService } from './personeel.service';
import { PersoneelResolver } from './personeel.resolver';

@Module({
  providers: [PersoneelResolver, PersoneelService],
})
export class PersoneelModule {}
