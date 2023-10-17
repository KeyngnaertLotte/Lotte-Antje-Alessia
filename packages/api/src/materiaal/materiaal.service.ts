import { Injectable } from '@nestjs/common'
import { CreateMateriaalInput } from './dto/create-materiaal.input'
import { UpdateMateriaalInput } from './dto/update-materiaal.input'
import { Materiaal } from './entities/materiaal.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class MateriaalService {
  constructor(
    @InjectRepository(Materiaal)
    private readonly materiaalRepository: Repository<Materiaal>,
  ) {}

  create(createMateriaalInput: CreateMateriaalInput) {
    const m = new Materiaal()
    m.item = createMateriaalInput.item
    m.categorie = createMateriaalInput.categorie
    m.aantal = createMateriaalInput.aantal

    return this.materiaalRepository.save(m)
  }

  findAll() {
    return this.materiaalRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} materiaal`
  }

  update(id: number, updateMateriaalInput: UpdateMateriaalInput) {
    return `This action updates a #${id} materiaal`
  }

  remove(id: number) {
    return `This action removes a #${id} materiaal`
  }
}
