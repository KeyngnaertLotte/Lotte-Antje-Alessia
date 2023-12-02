import { Injectable } from '@nestjs/common'
import { CreateMateriaalInput } from './dto/create-materiaal.input'
import { UpdateMateriaalInput } from './dto/update-materiaal.input'
import { Materiaal } from './entities/materiaal.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TakenService } from 'src/taken/taken.service'

@Injectable()
export class MateriaalService {
  constructor(
    @InjectRepository(Materiaal)
    private readonly materiaalRepository: Repository<Materiaal>,
    private readonly takenService: TakenService,
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

  async UpdateAantalOptellen(materiaalId: string): Promise<void> {
    const materiaal = await this.findOneById(materiaalId)
    this.materiaalRepository.update(
      { id: materiaalId },
      { aantal: materiaal.aantal + 1 },
    )
  }

  async findAllCategories() {
    const materiaalData = await this.materiaalRepository.find()
    const categories = materiaalData.map(item => item.categorie)
    return categories
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
      let currentTime = new Date()

      // Add 30 minutes
      currentTime.setMinutes(currentTime.getMinutes() + 30)

      // Get the hours and minutes
      let hours = currentTime.getHours()
      let minutes = currentTime.getMinutes()

      // Format the hours and minutes as a string
      let formattedTime = `${hours}:${minutes}`

      await this.takenService.create({
        naam: `aanvullen ${materiaal[0].item}`,
        aantal: aantal * 10,
        category: materiaal[0].categorie,
        plaats: 'Magazijn',
        type: 'Aanvulling',
        deadline: formattedTime,
      })
      throw new Error('Niet genoeg materiaal')
    } else {
      const resultAantal = materiaal[0].aantal - aantal
      this.materiaalRepository.update(
        { id: materiaal[0].id },
        { aantal: resultAantal },
      )
    }
  }

  async findByCategorie(categorie: string): Promise<Materiaal[]> {
    return this.materiaalRepository.find({ where: { categorie: categorie } })
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
