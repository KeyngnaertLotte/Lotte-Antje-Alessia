import { Test, TestingModule } from '@nestjs/testing';
import { ArtiestenResolver } from './artiesten.resolver';
import { ArtiestenService } from './artiesten.service';

describe('ArtiestenResolver', () => {
  let resolver: ArtiestenResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtiestenResolver, ArtiestenService],
    }).compile();

    resolver = module.get<ArtiestenResolver>(ArtiestenResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
