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

  async UpdateAantalOptellen(materiaalId: string): Promise<void> {
    const materiaal = await this.findOneById(materiaalId)
    this.materiaalRepository.update(
      { id: materiaalId },
      { aantal: materiaal.aantal + 1 },
    )
  }

  async UpdateAantalaftrekken(
    materiaalId: string,
    aantal: number,
  ): Promise<void> {
    //@ts-ignore
    const materiaal = await this.findOneById(materiaalId)
    this.materiaalRepository.update(
      { id: materiaalId },
      { aantal: materiaal.aantal - aantal },
    )
  }

  async checkMateriaal(materiaalnaam: string, aantal: number) {
    //@ts-ignore

    const materiaal: Materiaal[] = await this.materiaalRepository.find({
      where: { item: materiaalnaam },
    })
    console.log(materiaal)
    if (materiaal.length === 0) {
      throw new Error('Materiaal niet gevonden')
    }
    // check if there is enough materiaal
    if (materiaal[0].aantal < aantal) {
      throw new Error('Niet genoeg materiaal')
    } else {
      const resultAantal = materiaal[0].aantal - aantal
      this.materiaalRepository.update(
        { id: materiaal[0].id },
        { aantal: resultAantal },
      )
    }
  }

  findOneById(id: string): Promise<Materiaal> {
    try {
      // @ts-ignore
      return this.materiaalRepository.findOne({ _id: new ObjectId(id) })
    } catch (e) {
      throw new Error('Materiaal niet gevonden')
    }
  }
}
