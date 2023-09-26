import { Test, TestingModule } from '@nestjs/testing';
import { PersoneelService } from './personeel.service';

describe('PersoneelService', () => {
  let service: PersoneelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersoneelService],
    }).compile();

    service = module.get<PersoneelService>(PersoneelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
