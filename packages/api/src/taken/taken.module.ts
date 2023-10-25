import { Module } from '@nestjs/common';
import { TakenService } from './taken.service';
import { TakenResolver } from './taken.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taak } from './entities/taken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Taak])],
  providers: [TakenResolver, TakenService],

  exports: [TakenService],
})
export class TakenModule {}
