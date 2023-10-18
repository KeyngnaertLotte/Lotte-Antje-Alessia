import { Test, TestingModule } from '@nestjs/testing';
import { MateriaalResolver } from './materiaal.resolver';
import { MateriaalService } from './materiaal.service';

describe('MateriaalResolver', () => {
  let resolver: MateriaalResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriaalResolver, MateriaalService],
    }).compile();

    resolver = module.get<MateriaalResolver>(MateriaalResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
