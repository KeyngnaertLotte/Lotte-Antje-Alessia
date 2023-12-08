import { Module } from '@nestjs/common';
import { BezoekersService } from './bezoekers.service';
import { BezoekersResolver } from './bezoekers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bezoeker } from './entities/bezoeker.entity';
import { BezoekersGateway } from './bezoekers.gateway';

@Module({
  providers: [BezoekersResolver, BezoekersService, BezoekersGateway],
  imports: [TypeOrmModule.forFeature([Bezoeker])],
  exports: [BezoekersService, BezoekersGateway]
})
export class BezoekersModule {}
