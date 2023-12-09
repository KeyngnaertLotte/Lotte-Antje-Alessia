import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { BezoekersModule } from 'src/bezoekers/bezoekers.module';

@Module({
  imports: [BezoekersModule],
  providers: [NotificationsGateway]
})
export class NotificationsModule {}
