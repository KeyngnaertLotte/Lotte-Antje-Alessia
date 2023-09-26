import { Test, TestingModule } from '@nestjs/testing';
import { BezoekersService } from './bezoekers.service';

describe('BezoekersService', () => {
  let service: BezoekersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BezoekersService],
    }).compile();

    service = module.get<BezoekersService>(BezoekersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
