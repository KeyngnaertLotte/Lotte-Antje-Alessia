import { Injectable } from '@nestjs/common'
import { CreateTakenInput } from './dto/create-taken.input'
import { UpdateTakenInput } from './dto/update-taken.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Taak } from './entities/taken.entity'
import { FindOneOptions, Repository } from 'typeorm'
import { ObjectId } from 'mongodb'

@Injectable()
export class TakenService {
  constructor(
    @InjectRepository(Taak)
    private readonly taakRepository: Repository<Taak>,
  ) {}
  create(createTakenInput: CreateTakenInput) {
    const t = new Taak()
    t.plaats = createTakenInput.plaats
    t.type = createTakenInput.type
    t.naam = createTakenInput.naam
    t.category = createTakenInput.category
    t.aantal = createTakenInput.aantal
    t.deadline = createTakenInput.deadline
    return this.taakRepository.save(t)
  }

  findAll() {
    return `This action returns all taken`
  }

  findOne(id: number) {
    return `This action returns a #${id} taken`
  }

  findByType(type: string): Promise<Taak[]> {
    return this.taakRepository.find({where: { type }})
  }

  update(id: number, updateTakenInput: UpdateTakenInput) {
    return `This action updates a #${id} taken`
  }

  async remove(id: string) {
    // check if taak exists
    const taakObj = await this.findOneById(id)
    if (!taakObj) throw new Error('Taak niet gevonden')
    else {
      console.log('taakObj', taakObj)

      this.taakRepository.remove(taakObj)

      return taakObj
    }
  }

  saveAll(taken: Taak[]) {
    return this.taakRepository.save(taken)
  }

  findOneById(id: string): Promise<Taak> {
    try {
      // @ts-ignore
      return this.taakRepository.findOne({ _id: new ObjectId(id) })
    } catch (e) {
      throw new Error('Taak niet gevonden')
    }
  }
}
