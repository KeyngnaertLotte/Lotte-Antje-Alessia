import { Module } from '@nestjs/common'
import { TakenService } from './taken.service'
import { TakenResolver } from './taken.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Taak } from './entities/taken.entity'
import { CreateTakenInput } from './dto/create-taken.input'
import { UpdateTakenInput } from './dto/update-taken.input'

@Module({
  imports: [TypeOrmModule.forFeature([Taak])],
  providers: [TakenResolver, TakenService, CreateTakenInput, UpdateTakenInput],

  exports: [TakenService, CreateTakenInput],
})
export class TakenModule {}
