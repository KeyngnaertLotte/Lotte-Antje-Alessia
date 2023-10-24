import { Test, TestingModule } from '@nestjs/testing';
import { TakenService } from './taken.service';

describe('TakenService', () => {
  let service: TakenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TakenService],
    }).compile();

    service = module.get<TakenService>(TakenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
