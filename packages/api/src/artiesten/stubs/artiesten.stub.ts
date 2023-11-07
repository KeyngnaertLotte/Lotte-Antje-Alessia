import { CreateArtiestenInput } from '../dto/create-artiesten.input'
import { Artiest } from '../entities/artiesten.entity'
export const createartiestInputStub = (): CreateArtiestenInput => {
  const a = new CreateArtiestenInput()
  a.naam = 'Be Right Back'
  // a.podium = 'Antje'
  a.uid = 'Kz5oJmB8iMMZOKKy8BT9O1BaYZx2'
  return a
}

export const artiestStub = (): Artiest => {
  const a = new Artiest()
  a.naam = 'Be Right Back'
  a.podium = 'Antje'
  a.uid = 'Kz5oJmB8iMMZOKKy8BT9O1BaYZx2'
  return a
}
