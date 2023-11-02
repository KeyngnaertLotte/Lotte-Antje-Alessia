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

  // async UpdateAantalOptellen(
  //   materiaalId: string,
  //   itemNaam: string,
  // ): Promise<void> {
  //   const materiaal = await this.findOneById(materiaalId)
  //   const item = materiaal.items[itemNaam]
  //   this.materiaalRepository.update(
  //     { id: materiaalId },
  //     { items: { ...materiaal.items, [itemNaam]: item + 1 } },
  //   )
  // }

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

  // async UpdateAantalaftrekken(
  //   materiaalId: string,
  //   itemNaam: string,
  //   aantal: number,
  // ): Promise<void> {
  //   const materiaal = await this.findOneById(materiaalId)
  //   const item = materiaal.items[itemNaam]
  //   this.materiaalRepository.update(
  //     { id: materiaalId },
  //     { items: { ...materiaal.items, [itemNaam]: item - aantal } },
  //   )
  // }

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

  // hier ben ik totaal niet zeker van
  // async checkMateriaal(materiaalnaam: string, aantal: number) {
  //   //@ts-ignore
  //   const materiaalList: Materiaal[] = await this.materiaalRepository.find({
  //     where: { items: [{ naam: materiaalnaam }] },
  //   })

  //   if (materiaalList.length === 0) {
  //     throw new Error('Materiaal niet gevonden')
  //   }

  //   const materiaal = materiaalList[0]
  //   const matchingItem = materiaal.items.find(
  //     item => item.naam === materiaalnaam,
  //   )

  //   if (!matchingItem) {
  //     throw new Error('Materiaal niet gevonden in items')
  //   }

  //   if (matchingItem.aantal < aantal) {
  //     throw new Error('Niet genoeg materiaal')
  //   } else {
  //     const resultAantal = matchingItem.aantal - aantal
  //     // Update the 'aantal' property for the specific item within the 'items' array
  //     const updatedItems = materiaal.items.map(item => {
  //       if (item.naam === materiaalnaam) {
  //         return { ...item, aantal: resultAantal }
  //       }
  //       return item
  //     })

  //     // Update the document in the database
  //     await this.materiaalRepository.update(
  //       { id: materiaal.id },
  //       { items: updatedItems },
  //     )
  //   }
  // }

  findOneById(id: string): Promise<Materiaal> {
    try {
      // @ts-ignore
      return this.materiaalRepository.findOne({ _id: new ObjectId(id) })
    } catch (e) {
      throw new Error('Materiaal niet gevonden')
    }
  }
}
