import { CreateArtiestenInput } from '../dto/create-artiesten.input'
import { CreateBenodigdhedenInput } from '../dto/create-benodigdheden.input'
import { Artiest } from '../entities/artiesten.entity'
export const createartiestInputStub = (): CreateArtiestenInput => {
  const a = new CreateArtiestenInput()
  a.naam = 'Be Right Back'
  a.uid = 'Kz5oJmB8iMMZOKKy8BT9O1BaYZx2'
  return a
}

export const artiestStub = (): Artiest => {
  const a = new Artiest()
  a.naam = 'Be Right Back'
  a.uid = 'Kz5oJmB8iMMZOKKy8BT9O1BaYZx2'
  return a
}

export const artiestStub2 = (): Artiest => {
  const a = new Artiest()
  a.naam = 'Antje'
  a.uid = 'Kz5oJmB8iMMZOKKy8BT9O1BaYZx2'
  return a
}

export const benodigdhedenStub = (): Artiest => {
  const a = new Artiest()
  a.benodigdheden = [
    {
      item: 'cola',
      podium: 'Lotte',
      aantal: 1,
      categorie: 'drank',
      deadline: '2021-05-05T00:00:00.000Z',
    },
  ]
  return a
}
