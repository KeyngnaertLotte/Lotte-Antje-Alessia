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

  update(id: number, updateTakenInput: UpdateTakenInput) {
    return `This action updates a #${id} taken`
  }

  remove(id: number) {
    return `This action removes a #${id} taken`
  }

  saveAll(taken: Taak[]) {
    return this.taakRepository.save(taken)
  }
}
