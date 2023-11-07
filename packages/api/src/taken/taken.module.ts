import { Module } from '@nestjs/common'
import { TakenService } from './taken.service'
import { TakenResolver } from './taken.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Taak } from './entities/taken.entity'
import { CreateTakenInput } from './dto/create-taken.input'

@Module({
  imports: [TypeOrmModule.forFeature([Taak])],
  providers: [TakenResolver, TakenService, CreateTakenInput],

  exports: [TakenService, CreateTakenInput],
})
export class TakenModule {}
