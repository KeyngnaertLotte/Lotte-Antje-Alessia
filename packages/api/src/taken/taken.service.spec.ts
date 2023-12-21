import { Test, TestingModule } from '@nestjs/testing'
import { TakenService } from './taken.service'
import { Taak } from './entities/taken.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateResult } from 'typeorm'

describe('TakenService', () => {
  let service: TakenService
  let mockTakenRepository: Repository<Taak>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TakenService,
        {
          provide: getRepositoryToken(Taak),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<TakenService>(TakenService)
    mockTakenRepository = module.get<Repository<Taak>>(getRepositoryToken(Taak))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
    it('should return an array of taken', async () => {
      const result = [new Taak()]
      jest.spyOn(mockTakenRepository, 'find').mockResolvedValue(result)
      expect(await service.findAll()).toBe(result)
    })
  })

  describe('findByType', () => {
    it('should return an array of taken', async () => {
      const result = [new Taak()]
      jest.spyOn(mockTakenRepository, 'find').mockResolvedValue(result)
      expect(await service.findByType('test')).toBe(result)
    })
  })

  describe('update', () => {
    it('should update a taak', async () => {
      const result = new Taak()
      const updateResult = new UpdateResult()
      const id = 'test'
      const status = true
      jest.spyOn(service, 'findOneById').mockResolvedValue(result)
      jest.spyOn(mockTakenRepository, 'update').mockResolvedValue(updateResult)
      await service.update(id, status)
      expect(service.findOneById).toHaveBeenCalledWith(id)
      expect(mockTakenRepository.update).toHaveBeenCalledWith(
        { id: result.id },
        { status: status },
      )
      expect(await service.update(id, status)).toBe('Taak status geüpdatet')
    })
  })

  describe('findOneById', () => {
    it('should return null if taak is not found', async () => {
      const id = 'test'
      jest.spyOn(service, 'findOneById').mockResolvedValue(null)
      const result = await service.findOneById(id)
      expect(result).toBeNull()
    })
  })

  describe('update', () => {
    it('should throw an error if taak is not found', async () => {
      const id = 'test'
      const status = true
      jest.spyOn(service, 'findOneById').mockResolvedValue(null)
      await expect(service.update(id, status)).rejects.toThrow(
        'Taak niet gevonden',
      )
    })

    it('should throw an error if update operation fails', async () => {
      const result = new Taak()
      const id = 'test'
      const status = true
      jest.spyOn(service, 'findOneById').mockResolvedValue(result)
      jest.spyOn(mockTakenRepository, 'update').mockImplementation(() => {
        throw new Error('Update operation failed')
      })
      await expect(service.update(id, status)).rejects.toThrow(
        'Update operation failed',
      )
    })
  })
})
