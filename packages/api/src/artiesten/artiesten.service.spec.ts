import { Test, TestingModule } from '@nestjs/testing';
import { ArtiestenService } from './artiesten.service';

describe('ArtiestenService', () => {
  let service: ArtiestenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtiestenService],
    }).compile();

    service = module.get<ArtiestenService>(ArtiestenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
