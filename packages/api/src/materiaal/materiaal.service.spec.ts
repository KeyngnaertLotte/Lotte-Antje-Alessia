import { Test, TestingModule } from '@nestjs/testing';
import { MateriaalService } from './materiaal.service';

describe('MateriaalService', () => {
  let service: MateriaalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriaalService],
    }).compile();

    service = module.get<MateriaalService>(MateriaalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
