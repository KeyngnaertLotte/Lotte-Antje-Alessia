import { Test, TestingModule } from '@nestjs/testing';
import { BezoekersResolver } from './bezoekers.resolver';
import { BezoekersService } from './bezoekers.service';

describe('BezoekersResolver', () => {
  let resolver: BezoekersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BezoekersResolver, BezoekersService],
    }).compile();

    resolver = module.get<BezoekersResolver>(BezoekersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
