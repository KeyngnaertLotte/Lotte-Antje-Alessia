import { Injectable } from '@nestjs/common'
import { CreateMateriaalInput } from './dto/create-materiaal.input'
import { UpdateMateriaalInput } from './dto/update-materiaal.input'
import { Materiaal } from './entities/materiaal.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Taak } from 'src/taken/entities/taken.entity'

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

  async UpdateAantalOptellen(materiaalId: string): Promise<void> {
    const materiaal = await this.findOneById(materiaalId)
    this.materiaalRepository.update(
      { id: materiaalId },
      { aantal: materiaal.aantal + 1 },
    )
  }

  async UpdateAantalaftrekken(materiaalId: string): Promise<void> {
    const materiaal = await this.findOneById(materiaalId)
    this.materiaalRepository.update(
      { id: materiaalId },
      { aantal: materiaal.aantal - 1 },
    )
  }

  findOneById(id: string): Promise<Materiaal> {
    try {
      // @ts-ignore
      return this.materiaalRepository.findOne({ _id: new ObjectId(id) })
    } catch (e) {
      throw new Error('Taak niet gevonden')
    }
  }
}
