import { Module } from '@nestjs/common';
import { BezoekersService } from './bezoekers.service';
import { BezoekersResolver } from './bezoekers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bezoeker } from './entities/bezoeker.entity';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Module({
  providers: [BezoekersResolver, BezoekersService, NotificationsGateway],
  imports: [TypeOrmModule.forFeature([Bezoeker])],
  exports: [BezoekersService]
})
export class BezoekersModule {}
