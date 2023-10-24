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

  describe('create()', () => {
    describe('when a bezoeker is created', () => {
      it('should call bezoekerRepo.save()', () => {
        const saveSpy = jest.spyOn(mockBezoekerRepository, 'save')
        const bezoeker = new Bezoeker()
        service.create(bezoeker)
        expect(saveSpy).toHaveBeenCalledTimes(1)
      })
      it('shoul call bezoekerRepo.save() with the correct params', async() => {
        const saveSpy = jest.spyOn(mockBezoekerRepository, 'save')
        const bezoeker = createBezoekerInputStub()

        await service.create(bezoeker)
        expect(saveSpy).toHaveBeenCalledWith(bezoeker)
      })
    })
  })
})
