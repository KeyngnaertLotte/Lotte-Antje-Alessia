import { Test, TestingModule } from '@nestjs/testing';
import { TakenResolver } from './taken.resolver';
import { TakenService } from './taken.service';

describe('TakenResolver', () => {
  let resolver: TakenResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TakenResolver, TakenService],
    }).compile();

    resolver = module.get<TakenResolver>(TakenResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
