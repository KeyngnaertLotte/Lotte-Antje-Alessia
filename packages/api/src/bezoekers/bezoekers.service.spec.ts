import { Test, TestingModule } from '@nestjs/testing'
import { BezoekersService } from './bezoekers.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Bezoeker } from './entities/bezoeker.entity'
import { createBezoekerInputStub, bezoekerStub } from './stubs/bezoekers.stub'

describe('BezoekersService', () => {
  let service: BezoekersService
  let mockBezoekerRepository: Repository<Bezoeker>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BezoekersService,
        {
          provide: getRepositoryToken(Bezoeker),
          useValue: {
            save: jest.fn().mockResolvedValue(bezoekerStub()),
            findOneByOrFail: jest.fn().mockResolvedValue(bezoekerStub()),
          },
        },
      ],
    }).compile()

    service = module.get<BezoekersService>(BezoekersService)
    mockBezoekerRepository = module.get<Repository<Bezoeker>>(
      getRepositoryToken(Bezoeker),
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    describe('when a bezoeker is created', () => {
      it('should call bezoekerRepo.save()', () => {
        const saveSpy = jest.spyOn(mockBezoekerRepository, 'save')
        const bezoeker = new Bezoeker()
        service.create(bezoeker)
        expect(saveSpy).toHaveBeenCalledTimes(1)
      })
      it('shoul call bezoekerRepo.save() with the correct params', async() => {
        const myTestBezoeker: Bezoeker = bezoekerStub()
        const saveSpy = jest.spyOn(mockBezoekerRepository, 'save')
        
        await service.create(myTestBezoeker)
        expect(saveSpy).toHaveBeenCalledWith(myTestBezoeker)
      })
      it('should return the new bezoeker', async () => {
        const myTestBezoeker = createBezoekerInputStub()
        const myBezoekerOutput = bezoekerStub()
        const r = await service.create(myTestBezoeker)
        expect(r).toEqual(myBezoekerOutput)
      })
    })
  })

  describe('findOneByUid', () => {
      it('should call BezoekerRepository.findOne one time', async () => {
        const findOneSpy = jest.spyOn(mockBezoekerRepository, 'findOneByOrFail')
        await service.findOneByUid('IOWulnBz2bPXt8maT77b25H8M8N2')
        expect(findOneSpy).toHaveBeenCalledTimes(1)
      })

      it('should call BezoekerRepository.findOne with the correct parameters', async () => {
        const findOneSpy = jest.spyOn(mockBezoekerRepository, 'findOneByOrFail')
        await service.findOneByUid('IOWulnBz2bPXt8maT77b25H8M8N2')
        expect(findOneSpy).toHaveBeenCalledWith({ uid: 'IOWulnBz2bPXt8maT77b25H8M8N2' })
      })

      it('should return the correct bezoeker', async () => {
        const myBezoeker = bezoekerStub()
        const r = await service.findOneByUid('IOWulnBz2bPXt8maT77b25H8M8N2')
        expect(r).toEqual(myBezoeker)
      })
    })
})
