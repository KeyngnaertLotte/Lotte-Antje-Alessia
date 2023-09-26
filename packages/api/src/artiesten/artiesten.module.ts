import { Module } from '@nestjs/common';
import { ArtiestenService } from './artiesten.service';
import { ArtiestenResolver } from './artiesten.resolver';

@Module({
  providers: [ArtiestenResolver, ArtiestenService],
})
export class ArtiestenModule {}
