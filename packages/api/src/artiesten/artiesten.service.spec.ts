import { Test, TestingModule } from '@nestjs/testing'
import { ArtiestenService } from './artiesten.service'
import { Repository } from 'typeorm'
import { Artiest } from './entities/artiesten.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import {
  artiestStub,
  createartiestInputStub,
  materiaalStub,
  resultMateriaalStub,
} from './stubs/artiesten.stub'
import { TakenService } from 'src/taken/taken.service'
import { MateriaalService } from 'src/materiaal/materiaal.service'
import { CreateArtiestenInput } from './dto/create-artiesten.input'
import { UsersService } from 'src/users/users.service'

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
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
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
    it('should call add new materiaal to artiest 1 time', async () => {
      const saveSpy = jest
        .spyOn(mockArtiestenRepository, 'save')
        .mockResolvedValue(resultMateriaalStub())
      const artiest = artiestStub()
      const materiaal = materiaalStub()
      await service.AddMateriaaltoArtiest(artiest.uid, materiaal)
      expect(saveSpy).toBeCalledTimes(1)
    })
    it('should return the updated artiest', async () => {
      const artiest = artiestStub()
      const materiaal = materiaalStub()
      const result = await service.AddMateriaaltoArtiest(artiest.uid, materiaal)
      const expectedResult = resultMateriaalStub()
      expect(result).toEqual(expectedResult)
    })
  })
})
