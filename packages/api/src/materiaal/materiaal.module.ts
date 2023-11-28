import { Module } from '@nestjs/common';
import { MateriaalService } from './materiaal.service';
import { MateriaalResolver } from './materiaal.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materiaal } from './entities/materiaal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Materiaal])],
  providers: [MateriaalResolver, MateriaalService],
  exports: [MateriaalService],
})
export class MateriaalModule {}
