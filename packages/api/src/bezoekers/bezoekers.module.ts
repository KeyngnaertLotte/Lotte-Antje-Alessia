import { Module } from '@nestjs/common';
import { BezoekersService } from './bezoekers.service';
import { BezoekersResolver } from './bezoekers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bezoeker } from './entities/bezoeker.entity';

@Module({
  providers: [BezoekersResolver, BezoekersService],
  imports: [TypeOrmModule.forFeature([Bezoeker])],
  exports: [BezoekersService]
})
export class BezoekersModule {}
