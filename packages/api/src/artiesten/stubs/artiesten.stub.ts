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
  a.podium = 'Lotte'
  a.benodigdheden = []
  return a
}


export const materiaalStub = (): CreateBenodigdhedenInput => {
  const m = new CreateBenodigdhedenInput()
  m.item = 'Frisdrank'
  m.aantal = 1
  m.categorie = 'drinken'
  m.deadline = '12:00'
  return m
}

export const resultMateriaalStub = (): Artiest => {
  const a = new Artiest()
  a.uid = 'Kz5oJmB8iMMZOKKy8BT9O1BaYZx2'
  a.naam = 'Be Right Back'
  a.podium = 'Lotte'
  a.benodigdheden = [
    {
      item: 'Frisdrank',
      podium: 'Lotte',
      aantal: 1,
      categorie: 'drinken',
    },
  ]
  return a
}
