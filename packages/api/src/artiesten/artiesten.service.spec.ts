import { Test, TestingModule } from '@nestjs/testing'
import { ArtiestenService } from './artiesten.service'
import { Repository } from 'typeorm'
import { Artiest } from './entities/artiesten.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import {
  artiestStub,
  benodigdhedenStub,
  createartiestInputStub,
} from './stubs/artiesten.stub'
import { TakenService } from 'src/taken/taken.service'
import { MateriaalService } from 'src/materiaal/materiaal.service'
import { CreateArtiestenInput } from './dto/create-artiesten.input'

describe('ArtiestenService', () => {
  let service: ArtiestenService
  let mockArtiestenRepository: Repository<Artiest>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtiestenService,
        {
          provide: getRepositoryToken(Artiest),
          useValue: {
            save: jest.fn().mockResolvedValue(artiestStub()),
            find: jest.fn().mockResolvedValue([artiestStub()]),
            findOne: jest.fn().mockResolvedValue(artiestStub()),
            delete: jest.fn().mockResolvedValue(artiestStub()),
            update: jest.fn(),
          },
        },
        {
          provide: MateriaalService,
          useValue: {
            checkMateriaal: jest.fn(),
          },
        },
        {
          provide: TakenService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<ArtiestenService>(ArtiestenService)
    mockArtiestenRepository = module.get<Repository<Artiest>>(
      getRepositoryToken(Artiest),
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createArtiest', () => {
    it('should call artiesten repo .create one time', async () => {
      const myArtiest = createartiestInputStub()
      const saveSpy = jest.spyOn(mockArtiestenRepository, 'save')
      await service.create(myArtiest)
      expect(saveSpy).toBeCalledTimes(1)
    })
    it('should call artiestRepository.save with the correct parameters', async () => {
      const myTestArtiest: CreateArtiestenInput = createartiestInputStub()
      const saveSpy = jest.spyOn(mockArtiestenRepository, 'save')
      await service.create(myTestArtiest)
      expect(saveSpy).toBeCalledWith(myTestArtiest)
    })

    it('should return the created artiest', async () => {
      const myTestArtiestInput = createartiestInputStub()
      const myArtiestOutput = artiestStub()

      const r = await service.create(myTestArtiestInput)
      expect(r).toEqual(myArtiestOutput)
    })
  })

  describe('findAll', () => {
    it('should call artiestRepository.find one time', async () => {
      const findSpy = jest.spyOn(mockArtiestenRepository, 'find')
      await service.findAll()
      expect(findSpy).toBeCalledTimes(1)
    })

    it('should return an array of artiesten', async () => {
      const myArtiest = artiestStub()
      const r = await service.findAll()
      expect(r).toEqual([myArtiest])
    })
  })

  describe('findOneByUid', () => {
    it('should call artiestRepository.findOne one time', async () => {
      const findOneSpy = jest.spyOn(mockArtiestenRepository, 'findOne')
      await service.findOneByUid('Kz5oJmB8iMMZOKKy8BT9O1BaYZx2')
      expect(findOneSpy).toBeCalledTimes(1)
    })

    it('should call artiestenRepository.findOne with the correct parameters', async () => {
      const findOneSpy = jest.spyOn(mockArtiestenRepository, 'findOne')
      await service.findOneByUid('Kz5oJmB8iMMZOKKy8BT9O1BaYZx2')
      expect(findOneSpy).toBeCalledWith({
        where: { uid: 'Kz5oJmB8iMMZOKKy8BT9O1BaYZx2' },
      })
    })

    it('should return the Artiest', async () => {
      const myArtiest = artiestStub()
      const r = await service.findOneByUid('Kz5oJmB8iMMZOKKy8BT9O1BaYZx2')
      expect(r).toEqual(myArtiest)
    })
  })

  describe('addMateriaalToArtiest', () => {
    it('should add new materiaal to artiest', async () => {
      // Arrange
      const saveSpy = jest
        .spyOn(mockArtiestenRepository, 'save')
        .mockResolvedValue(benodigdhedenStub())
    })

    // it('should update existing materiaal quantity in artiest', async () => {
    //   // Arrange
    //   const uid = 'Kz5oJmB8iMMZOKKy8BT9O1BaYZx2';
    //   const materiaal: CreateBenodigdhedenInput = {
    //     item: 'Existing Item',
    //     aantal: 3,
    //     categorie: 'Existing Category',
    //     podium: 'Existing Podium',
    //     deadline: new Date(),
    //   };

    //   const findOneByUidSpy = jest.spyOn(service, 'findOneByUid').mockResolvedValue(artiestStub());
    //   const checkMateriaalSpy = jest.spyOn(service.materiaalService, 'checkMateriaal').mockResolvedValue();
    //   const saveSpy = jest.spyOn(service.artiestRepository, 'save').mockResolvedValue(artiestStub());

    //   // Act
    //   await service.addMateriaalToArtiest(uid, materiaal);

    //   // Assert
    //   expect(findOneByUidSpy).toHaveBeenCalledWith(uid);
    //   expect(checkMateriaalSpy).toHaveBeenCalledWith(materiaal.item, materiaal.aantal);
    //   expect(saveSpy).toHaveBeenCalled();
    // });

    // it('should create new benodigdheden and taken for new materiaal', async () => {
    //   // Arrange
    //   const uid = 'Kz5oJmB8iMMZOKKy8BT9O1BaYZx2';
    //   const materiaal: CreateBenodigdhedenInput = {
    //     item: 'New Item',
    //     aantal: 5,
    //     categorie: 'New Category',
    //     podium: 'New Podium',
    //     deadline: new Date(),
    //   };
    // });
  })
})
