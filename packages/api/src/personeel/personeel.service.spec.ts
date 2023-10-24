import { Test, TestingModule } from '@nestjs/testing';
import { PersoneelService } from './personeel.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Personeel } from './entities/personeel.entity';
import { Repository } from 'typeorm';
import { createPersoneelInputStub, personeelStub } from './stubs/personeel.stub';

describe('PersoneelService', () => {
  let service: PersoneelService;
  let personeelRepositoryMock: Repository<Personeel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersoneelService, {
        provide: getRepositoryToken(Personeel),
        useValue: {
          save: jest.fn().mockResolvedValue(personeelStub()),
        },
      }],
    }).compile();

    service = module.get<PersoneelService>(PersoneelService);
    personeelRepositoryMock = module.get<Repository<Personeel>>(getRepositoryToken(Personeel))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    describe('when creating a personeel is called', () => {
      it('should call the personeelRepo.save()', async () => {
        const personeel = new Personeel();
        const saveSpy = jest.spyOn(personeelRepositoryMock, 'save')
        service.create(personeel)
        expect(saveSpy).toHaveBeenCalledTimes(1)
      })

      it('should call personeelRepo.save() with the correct params', async () => {
        const saveSpy = jest.spyOn(personeelRepositoryMock, 'save')
        const personeel = createPersoneelInputStub()

        await service.create(personeel)
        expect(saveSpy).toHaveBeenCalledWith(personeel)
      })
    })
  })
});
