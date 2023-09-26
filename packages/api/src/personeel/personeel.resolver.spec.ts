import { Test, TestingModule } from '@nestjs/testing';
import { PersoneelResolver } from './personeel.resolver';
import { PersoneelService } from './personeel.service';

describe('PersoneelResolver', () => {
  let resolver: PersoneelResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersoneelResolver, PersoneelService],
    }).compile();

    resolver = module.get<PersoneelResolver>(PersoneelResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
