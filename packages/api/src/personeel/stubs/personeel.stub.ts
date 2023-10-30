import { CreatePersoneelInput } from '../dto/create-personeel.input'
import { Personeel } from '../entities/personeel.entity'

export const createPersoneelInputStub = (): CreatePersoneelInput => {
  const personeel = new CreatePersoneelInput()
  personeel.voornaam = ''
  personeel.achternaam = ''
  personeel.type = ''
  // personeel.takenlijst = []
  return personeel
}

export const personeelStub = (): Personeel => {
  const personeel = new Personeel()
  personeel.id = "65142dcb878c159e99cb7808"
  personeel.uid = 'RWNd4xRhQkcf6E7iDIzjcOmCfNh2'
  personeel.voornaam = 'voornaam'
  personeel.achternaam = 'achternaam'
  personeel.type = 'type'
  // personeel.takenlijst = []
  return personeel
}
