import { artiestStub } from '../stubs/artiesten.stub'

export const ArtiestenService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(artiestStub),
})