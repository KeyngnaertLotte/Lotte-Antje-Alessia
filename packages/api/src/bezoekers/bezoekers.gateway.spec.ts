import { Test, TestingModule } from '@nestjs/testing';
import { BezoekersGateway } from './bezoekers.gateway';

describe('BezoekersGateway', () => {
  let gateway: BezoekersGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BezoekersGateway],
    }).compile();

    gateway = module.get<BezoekersGateway>(BezoekersGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
