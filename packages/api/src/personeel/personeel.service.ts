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

@Injectable()
export class PersoneelService {
  constructor(
    @InjectRepository(Personeel)
    private readonly personeelRepository: Repository<Personeel>,
    private readonly takenService: TakenService,
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
      where: {uid},
    })

    if (!personeel) {
      throw new Error('Personeel niet gevonden')
    }

    // zoek taak op
    const taak = await this.takenService.findOneById(taakId)
    console.log("taak ", taak)

    // push taak naar takenlijst
    const newTaak = new CreateTaakInput()
    newTaak.id = taak.id
    newTaak.plaats = taak.plaats
    newTaak.type = taak.type
    newTaak.naam = taak.naam
    newTaak.category = taak.category
    newTaak.aantal = taak.aantal
    newTaak.deadline = taak.deadline
    newTaak.status = taak.status

    personeel.takenlijst = [
      ...personeel.takenlijst,
      newTaak
    ]

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

  // 
  // voegt een bestaande taak bij een personeelslid
  // async addTaak(personeelId: ObjectId, taak: Takenlijst){
  //   const personeel = await this.personeelRepository.findOne({
  //     // @ts-ignore
  //     _id: new ObjectId(personeelId)
  //   })

  //   if(!personeel){
  //     throw new Error('Personeel niet gevonden')
  //   }

  //   personeel.takenlijst.push(taak)
  //   return this.personeelRepository.save(personeel)
  // }

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

  update(id: number, updatePersoneelInput: UpdatePersoneelInput) {
    return `This action updates a #${id} personeel`
  }

  remove(id: number) {
    return `This action removes a #${id} personeel`
  }

  saveAll(personeel: Personeel[]) {
    return this.personeelRepository.save(personeel)
  }

  truncate() {
    return this.personeelRepository.clear()
  }
}
