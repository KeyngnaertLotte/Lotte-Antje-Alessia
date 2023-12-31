import { Injectable } from '@nestjs/common'
import { CreateTakenInput } from './dto/create-taken.input'
import { UpdateTakenInput } from './dto/update-taken.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Taak } from './entities/taken.entity'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'

@Injectable()
export class TakenService {
  constructor(
    @InjectRepository(Taak)
    readonly taakRepository: Repository<Taak>,
  ) {}

  // CREATE taak
  create(createTakenInput: UpdateTakenInput) {
    const t = new Taak()
    t.plaats = createTakenInput.plaats
    t.type = createTakenInput.type
    t.naam = createTakenInput.naam
    t.category = createTakenInput.category
    t.aantal = createTakenInput.aantal
    t.deadline = createTakenInput.deadline
    t.materiaal = createTakenInput.materiaal
    return this.taakRepository.save(t)
  }

  // GET alle taken
  findAll() {
    return this.taakRepository.find()
  }

  // GET taak by id
  async findOneById(id: string) {
    try {
      // @ts-ignore
      return await this.taakRepository.findOne({ _id: new ObjectId(id) })
    } catch (e) {
      throw new Error('Taak niet gevonden')
    }
  }

  // GET taak by type, vb. "Podium - licht (Aléssia)"
  findByType(type: string): Promise<Taak[]> {
    return this.taakRepository.find({ where: { type } })
  }

  // started!! afwerken
  async update(id: string, status: boolean) {
    const taak = await this.findOneById(id)
    if (!taak) throw new Error('Taak niet gevonden')
    else {
      const updated = await this.taakRepository.update(
        { id: taak.id },
        { status: status },
      )
      return 'Taak status geüpdatet'
    }
  }

  async save(updatedTaak: UpdateTakenInput) {
    await this.taakRepository.save(updatedTaak)
  }

  async remove(id: string) {
    // check if taak exists
    const taakObj = await this.findOneById(id)
    if (!taakObj) throw new Error('Taak niet gevonden')
    else {
      await this.taakRepository.remove(taakObj)
      return `taak verwijderd`
    }
  }

  // slaat alle taken op
  saveAll(taken: Taak[]) {
    return this.taakRepository.save(taken)
  }

  // verwijdert alle taken
  truncate() {
    return this.taakRepository.clear()
  }
}
