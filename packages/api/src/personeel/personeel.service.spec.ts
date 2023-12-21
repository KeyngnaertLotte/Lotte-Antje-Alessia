import { Test, TestingModule } from '@nestjs/testing'
import { PersoneelService } from './personeel.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Personeel } from './entities/personeel.entity'
import { Repository } from 'typeorm'
import { createPersoneelInputStub, personeelStub } from './stubs/personeel.stub'
import { CreatePersoneelInput } from './dto/create-personeel.input'
import { TakenService } from 'src/taken/taken.service'
import { UsersService } from 'src/users/users.service'
import { MateriaalService } from 'src/materiaal/materiaal.service'
import { ObjectId } from 'mongodb'

describe('PersoneelService', () => {
  let service: PersoneelService
  let mockPersoneelRepository: Repository<Personeel>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersoneelService,
        {
          provide: getRepositoryToken(Personeel),
          useValue: {
            save: jest.fn().mockResolvedValue(personeelStub()),
            find: jest.fn().mockResolvedValue([personeelStub()]),
            findOne: jest.fn().mockResolvedValue(personeelStub()),
            update: jest.fn(),
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
        {
          provide: MateriaalService,
          useValue: {
            checkMateriaal: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<PersoneelService>(PersoneelService)
    mockPersoneelRepository = module.get<Repository<Personeel>>(
      getRepositoryToken(Personeel),
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
    it('should call personeelRepository.find one time', async () => {
      const findSpy = jest.spyOn(mockPersoneelRepository, 'find')
      await service.findAll()
      expect(findSpy).toBeCalledTimes(1)
    })

    it('should return an array of personeel', async () => {
      const myPersoneel = personeelStub()
      const r = await service.findAll()
      expect(r).toEqual([myPersoneel])
    })
  })

  describe('create', () => {
    it('should call personeelRepository.create one time', async () => {
      const myTestPersoneel = new Personeel()
      const saveSpy = jest.spyOn(mockPersoneelRepository, 'save')
      await service.create(myTestPersoneel)
      expect(saveSpy).toBeCalledTimes(1)
    })

    // it('should call personeelRepository.save with the correct parameters', async () => {
    //   const myTestPersoneel: CreatePersoneelInput = createPersoneelInputStub()
    //   const saveSpy = jest.spyOn(mockPersoneelRepository, 'save')

    //   await service.create(myTestPersoneel)

    //   expect(saveSpy).toBeCalledWith(myTestPersoneel)
    // })

    it('should return the created personeel', async () => {
      const myTestPersoneelInput = createPersoneelInputStub()
      const myPersoneelOutput = personeelStub()

      const r = await service.create(myTestPersoneelInput)
      expect(r).toEqual(myPersoneelOutput)
    })
  })

  describe('findOneById', () => {
    it('should call personeelRepository.findOne one time', async () => {
      const findOneSpy = jest.spyOn(mockPersoneelRepository, 'findOne')
      await service.findOneById('65770181068521f37967f45f')
      expect(findOneSpy).toBeCalledTimes(1)
    })

    it('should call personeelRepository.findOne with the correct parameters', async () => {
      const findOneSpy = jest.spyOn(mockPersoneelRepository, 'findOne')
      await service.findOneById('65770181068521f37967f45f')
      expect(findOneSpy).toBeCalledWith({
        _id: new ObjectId('65770181068521f37967f45f'),
      })
    })

    it('should return the personeel', async () => {
      const myPersoneel = personeelStub()
      const r = await service.findOneById('65770181068521f37967f45f')
      expect(r).toEqual(myPersoneel)
    })

    // it('should return an error when no valid id is given', async () => {
    //   try {
    //     const r = await service.findOneById('abc')
    //   } catch (e) {
    //     expect(e.message).toEqual('Invalid ObjectId')
    //   }
    // })
  })

  describe('findOneByUid', () => {
    it('should call personeelRepository.findOne one time', async () => {
      const findOneSpy = jest.spyOn(mockPersoneelRepository, 'findOne')
      await service.findOneByUid('KPWJh8Ql61YSg29EYyAIX7CrcKu1')
      expect(findOneSpy).toBeCalledTimes(1)
    })

    it('should call personeelRepository.findOne with the correct parameters', async () => {
      const findOneSpy = jest.spyOn(mockPersoneelRepository, 'findOne')
      await service.findOneByUid('KPWJh8Ql61YSg29EYyAIX7CrcKu1')
      expect(findOneSpy).toBeCalledWith({
        where: { uid: 'KPWJh8Ql61YSg29EYyAIX7CrcKu1' },
      })
    })

    it('should return Personeel', async () => {
      const myPersoneel = personeelStub()
      const r = await service.findOneByUid('KPWJh8Ql61YSg29EYyAIX7CrcKu1')
      expect(r).toEqual(myPersoneel)
    })
  })

  describe('UpdateType', () => {
    it('should call personeelRepository.find one time', async () => {
      const findSpy = jest.spyOn(mockPersoneelRepository, 'find')
      await service.UpdateType('KPWJh8Ql61YSg29EYyAIX7CrcKu1', 'bar')
      expect(findSpy).toBeCalledTimes(1)
    })

    it('should call personeelRepository.update one time', async () => {
      const updateSpy = jest.spyOn(mockPersoneelRepository, 'update')
      await service.UpdateType('KPWJh8Ql61YSg29EYyAIX7CrcKu1', 'bar')
      expect(updateSpy).toBeCalledTimes(1)
    })

    it('should call personeelRepository.update with the correct parameters', async () => {
      const updateSpy = jest.spyOn(mockPersoneelRepository, 'update')
      await service.UpdateType('KPWJh8Ql61YSg29EYyAIX7CrcKu1', 'bar')
      expect(updateSpy).toBeCalledWith(
        { id: '65142dcb878c159e99cb7808' },
        { type: 'bar' },
      )
    })
  })

  describe('createPersoneel', () => {
    it('should call personeelRepository.create one time', async () => {
      const myTestPersoneel = new Personeel()
      const saveSpy = jest.spyOn(mockPersoneelRepository, 'save')
      await service.create(myTestPersoneel)
      expect(saveSpy).toBeCalledTimes(1)
    })

    it('should return the created personeel', async () => {
      const myTestPersoneelInput = createPersoneelInputStub()
      const myPersoneelOutput = personeelStub()

      const r = await service.create(myTestPersoneelInput)
      expect(r).toEqual(myPersoneelOutput)
    })
  })
})
