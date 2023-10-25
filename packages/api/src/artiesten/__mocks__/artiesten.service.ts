import { artiestStub } from '../stubs/artiesten.stub'

export const ArtiestenService = jest.fn().mockReturnValue({
//   findAll: jest.fn().mockResolvedValue(artiestStub),
//   findOneById: jest.fn().mockResolvedValue(artiestStub),
//   findOneByName: jest.fn().mockResolvedValue(artiestStub),
//   findBirdsByCategory: jest.fn().mockResolvedValue([artiestStub]),
//   findBirdsBySearchString: jest.fn().mockResolvedValue([artiestStub]),
  create: jest.fn().mockResolvedValue(artiestStub),
//   incrementObservationsCount: jest.fn(),
//   saveAll: jest.fn().mockResolvedValue([artiestStub]),
})