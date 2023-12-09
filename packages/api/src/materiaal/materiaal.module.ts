import { Module } from '@nestjs/common'
import { MateriaalService } from './materiaal.service'
import { MateriaalResolver } from './materiaal.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Materiaal } from './entities/materiaal.entity'
import { TakenModule } from 'src/taken/taken.module'
import { UpdateTakenInput } from 'src/taken/dto/update-taken.input'

@Module({
  imports: [TypeOrmModule.forFeature([Materiaal]), TakenModule, UpdateTakenInput],
  providers: [MateriaalResolver, MateriaalService],
  exports: [MateriaalService],
})
export class MateriaalModule {}
