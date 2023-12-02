import { Module } from '@nestjs/common'
import { ArtiestenService } from './artiesten.service'
import { ArtiestenResolver } from './artiesten.resolver'
import { Artiest } from './entities/artiesten.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MateriaalModule } from 'src/materiaal/materiaal.module'
import { TakenModule } from 'src/taken/taken.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Artiest]), MateriaalModule, TakenModule, UsersModule],
  providers: [ArtiestenResolver, ArtiestenService],
  exports: [ArtiestenService],
})
export class ArtiestenModule {}
