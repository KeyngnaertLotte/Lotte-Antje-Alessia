import { Injectable } from '@nestjs/common'
import { CreatePersoneelInput } from './dto/create-personeel.input'
import { UpdatePersoneelInput } from './dto/update-personeel.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Personeel } from './entities/personeel.entity'
import { ObjectId } from 'mongodb'
import { Takenlijst } from './entities/task.entity'
import { Taak } from 'src/taken/entities/taken.entity'
import { TakenService } from 'src/taken/taken.service'
import { CreateTaakInput } from './dto/create-taak.input'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class PersoneelService {
  constructor(
    @InjectRepository(Personeel)
    private readonly personeelRepository: Repository<Personeel>,
    private readonly takenService: TakenService,
    private readonly usersService: UsersService,
  ) {}

  // CREATE personeel
  create(createPersoneelInput: CreatePersoneelInput): Promise<Personeel> {
    const p = new Personeel()
    p.uid = createPersoneelInput.uid
    p.voornaam = createPersoneelInput.voornaam
    p.achternaam = createPersoneelInput.achternaam
    p.type = createPersoneelInput.type
    p.takenlijst = []

    return this.personeelRepository.save(p)
  }

  // PUT takenlijst personeel met taak
  async AddTaak(uid: string, taakId: string) {
    // const currentPersoneel = await this.findOneById(id)
    const personeel = await this.personeelRepository.findOne({
      where: { uid },
    })

    if (!personeel) {
      throw new Error('Personeel niet gevonden')
    }

    // zoek taak op
    const taak = await this.takenService.findOneById(taakId)
    console.log('taak ', taak)

    // push taak naar takenlijst
    const newTaak = new CreateTaakInput()
    newTaak.id = taak.id
    newTaak.plaats = taak.plaats
    newTaak.type = taak.type
    newTaak.naam = taak.naam
    newTaak.category = taak.category
    newTaak.aantal = taak.aantal
    newTaak.deadline = taak.deadline
    newTaak.status = true

    personeel.takenlijst = [...personeel.takenlijst, newTaak]

    return this.personeelRepository.save(personeel)
  }

  // PUT type personeel
  async UpdateType(uid: string, type: string) {
    const personeel: Personeel[] = await this.personeelRepository.find({
      where: { uid: uid },
    })
    console.log(personeel)

    const updated = await this.personeelRepository.update(
      { id: personeel[0].id },
      { type: type },
    )

    console.log(updated)

    const findUpdated = await this.personeelRepository.find({
      where: { uid: uid },
    })

    return findUpdated[0]
  }

  findAll() {
    return this.personeelRepository.find()
  }

  findOneById(id: string): Promise<Personeel> {
    const obj = new Object(id)
    console.log(obj)
    // @ts-ignore
    return this.personeelRepository.findOne({ _id: new ObjectId(id) })
  }

  findOneByUid(uid: string): Promise<Personeel> {
    return this.personeelRepository.findOneByOrFail({ uid })
  }

  // DELETE taak bij personeel en in grote takenlijst
  async removeTaak(uid: string, taakId: string) {
    // check if personeel exists
    const personeelObj = this.findOneByUid(uid)
    if (!personeelObj) throw new Error('Personeel niet gevonden')
    else {
      // check if taak exists
      const taakObj = this.takenService.findOneById(taakId)
      if (!taakObj) throw new Error('Taak niet gevonden')
      else {
        // delete taak uit takenlijst
        const personeel = await this.personeelRepository.findOne({
          where: { uid: uid },
        })

        const obj = new ObjectId(taakId)

        // Find the index of the item with the given taakId in takenlijst
        const index = personeel.takenlijst.findIndex(
          taak => taak.id && String(taak.id) === String(obj),
        )

        if (index !== -1) {
          // Remove the item from takenlijst
          personeel.takenlijst.splice(index, 1)

          console.log('LIJST NA VERWIJDEREN: ', personeel.takenlijst)

          // Save the updated personeel object
          await this.personeelRepository.save(personeel)
        }

        // delete taak uit grote takenlijst
        this.takenService.remove(taakId)

        return personeel
      }
    }
  }

  async update(uid: string, updatePersoneel: UpdatePersoneelInput) {
    // update personeel
    const personeel = this.findOneByUid(uid)
    await personeel.then(p => {
      p.voornaam = updatePersoneel?.voornaam
      p.achternaam = updatePersoneel?.achternaam
      p.type = updatePersoneel?.type
      return this.personeelRepository.save(p)
    })

    const user = await this.usersService.findOneByUid(uid)

    const usernaam = user.naam

    if (usernaam.includes(' ')) {
      const uservoor = usernaam.split(' ')[0]
      let userachter = usernaam.split(' ').slice(1).join(' ')
      // userachter = userachter.join(' ')

      console.log(uservoor)
      console.log(userachter)

      if (updatePersoneel?.voornaam) {
        const naam = updatePersoneel?.voornaam + ' ' + userachter
        await this.usersService.updateNaam(uid, naam)
      }
      if (updatePersoneel?.achternaam) {
        const naam = uservoor + ' ' + updatePersoneel?.achternaam
        await this.usersService.updateNaam(uid, naam)
      }
    } else {
      if (updatePersoneel?.voornaam) {
        const naam = updatePersoneel?.voornaam
        await this.usersService.updateNaam(uid, naam)
      }
      if (updatePersoneel?.achternaam) {
        const naam = updatePersoneel?.achternaam
        await this.usersService.updateNaam(uid, naam)
      }
      if (updatePersoneel?.voornaam && updatePersoneel?.achternaam) {
        const naam =
          updatePersoneel?.voornaam + ' ' + updatePersoneel?.achternaam
        await this.usersService.updateNaam(uid, naam)
      }
    }

    return `personeel met uid ${uid} geupdate`
  }

  async remove(uid: string) {
    const personeel = await this.findOneByUid(uid)
    await this.personeelRepository.remove(personeel)
    await this.usersService.remove(uid)
    return 'user en artiest verwijderd'
  }

  saveAll(personeel: Personeel[]) {
    return this.personeelRepository.save(personeel)
  }

  truncate() {
    return this.personeelRepository.clear()
  }
}
