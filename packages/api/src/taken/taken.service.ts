import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTakenInput } from './dto/create-taken.input'
import { UpdateTakenInput } from './dto/update-taken.input'
import { DeleteTakenInput } from './dto/delete-taken.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Taak } from './entities/taken.entity'
import { FindOneOptions, Repository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { Args, Mutation } from '@nestjs/graphql'

@Injectable()
export class TakenService {
  constructor(
    @InjectRepository(Taak)
    private readonly taakRepository: Repository<Taak>,
  ) {}

  // CREATE taak
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

  // GET alle taken
  findAll() {
    return this.taakRepository.find()
  }

  // GET taak by id
  async findOneById(id: string){
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

  // PUT taak by id, werkt nog niet
  update(id: number, updateTakenInput: UpdateTakenInput) {

  }

  // DELETE taak by id, werkt nog niet
  // async delete(id: number, deleteTakenInput: DeleteTakenInput) {
  //   const taak = await this.taakRepository.findOne(id)
  //   if (!taak) {
  //     throw new NotFoundException(`Taak met id ${id} niet gevonden`)
  //   }
  //   return this.taakRepository.remove(taak)
  // }

  // slaat alle taken op
  saveAll(taken: Taak[]) {
    return this.taakRepository.save(taken)
  }
}
