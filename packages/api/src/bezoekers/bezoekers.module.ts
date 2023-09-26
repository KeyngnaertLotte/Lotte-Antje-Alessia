import { Module } from '@nestjs/common';
import { BezoekersService } from './bezoekers.service';
import { BezoekersResolver } from './bezoekers.resolver';

@Module({
  providers: [BezoekersResolver, BezoekersService],
})
export class BezoekersModule {}
