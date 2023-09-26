import { Module } from '@nestjs/common'
import { ArtiestenService } from './artiesten.service'
import { ArtiestenResolver } from './artiesten.resolver'
import { Artiesten } from './entities/artiesten.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Artiesten])],
  providers: [ArtiestenResolver, ArtiestenService],

  exports: [ArtiestenService],
})
export class ArtiestenModule {}
