import { Test, TestingModule } from '@nestjs/testing'
import { ArtiestenResolver } from './artiesten.resolver'
import { ArtiestenService } from './artiesten.service'
import { artiestStub } from './stubs/artiesten.stub'
import { Artiest } from './entities/artiesten.entity'
import { CreateArtiestenInput } from './dto/create-artiesten.input'

jest.mock('./artiesten.service')

describe('ArtiestenResolver', () => {
  let resolver: ArtiestenResolver
  let mockedService: ArtiestenService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtiestenResolver, ArtiestenService],
    }).compile()

    resolver = module.get<ArtiestenResolver>(ArtiestenResolver)
    mockedService = module.get<ArtiestenService>(ArtiestenService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createArtiest', () => {
    let myArtiestDTO: CreateArtiestenInput
    beforeEach(async () => {
      myArtiestDTO = {
        naam: artiestStub().naam,
        uid: artiestStub().uid,
      }
    })

    it('should call ArtiestenService.createArtiesten one time', async () => {
      await resolver.createArtiesten(myArtiestDTO)
      expect(mockedService.create).toBeCalledTimes(1)
    })

    it('should call artiestenService.createArtiesten with the correct parameters', async () => {
      await resolver.createArtiesten(myArtiestDTO)
      expect(mockedService.create).toBeCalledWith(myArtiestDTO)
    })

    it('should return the created artiest', async () => {
      const resultArtiest: Artiest =
        await resolver.createArtiesten(myArtiestDTO)
      expect(resultArtiest).toEqual(resultArtiest)
    })
  })
})
