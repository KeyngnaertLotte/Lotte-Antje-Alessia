import { Injectable } from '@nestjs/common'
import { CreateMateriaalInput } from './dto/create-materiaal.input'
import { Materiaal } from './entities/materiaal.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId, Repository } from 'typeorm'
import { TakenService } from 'src/taken/taken.service'
import { UpdateTakenInput } from 'src/taken/dto/update-taken.input'
import { check } from 'yargs'

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

  async findAllCategories() {
    const materiaalData = await this.materiaalRepository.find()
    const categories = materiaalData.map(item => item.categorie)
    return categories
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
        materiaal: materiaal[0].item,
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

  async updateTaak(id: string, updateTakenInput: UpdateTakenInput) {
    const taak = await this.takenService.findOneById(id)
    if (!taak) throw new Error('Taak niet gevonden')
    else {
      const aantal = taak.aantal
      const aantalUpdate = updateTakenInput.aantal

      const updatedTaak = Object.assign(taak, updateTakenInput)
      console.log('aantal', aantal)
      console.log('aantalUpdate', aantalUpdate)

      if (updateTakenInput.aantal) {
        if (aantalUpdate === aantal) {
          console.log('aantal is hetzelfde')
          await this.takenService.save(updatedTaak)
          return `taak ${id} geupdate`
        }
        if (aantalUpdate > aantal) {
          console.log('aantal is niet hetzelfde')

          const materiaal: Materiaal[] = await this.materiaalRepository.find({
            where: { item: taak.materiaal },
          })
          console.log('materiaal', materiaal[0].aantal)
          if (materiaal.length === 0) {
            throw new Error('Materiaal niet gevonden')
          }

          if (aantalUpdate > materiaal[0].aantal) {
            throw new Error('Niet genoeg materiaal')
          } else {
            const resultAantal = materiaal[0].aantal - aantalUpdate
            this.materiaalRepository.update(
              { id: materiaal[0].id },
              { aantal: resultAantal },
            )
            await this.takenService.save(updatedTaak)
            return `taak ${id} geupdate`
          }
        } else {
          const materiaal: Materiaal[] = await this.materiaalRepository.find({
            where: { item: taak.materiaal },
          })
          if (materiaal.length === 0) {
            throw new Error('Materiaal niet gevonden')
          }
          else {
            const resultAantal = materiaal[0].aantal + aantalUpdate
            console.log('resultAantal', resultAantal)
            this.materiaalRepository.update(
              { id: materiaal[0].id },
              { aantal: resultAantal },
            )
            await this.takenService.save(updatedTaak)
            return `taak ${id} geupdate`
          }
        }
      }
    }
  }

  async remove(id: string) {
    // check if taak exists
    const taakObj = await this.takenService.findOneById(id)
    const materiaal: Materiaal[] = await this.materiaalRepository.find({
      where: { item: taakObj.materiaal },
    })
    if (!taakObj) throw new Error('Taak niet gevonden')
    else {
      console.log('taakObj', taakObj)

      if (taakObj.type === 'Aanvulling') {
        console.log(taakObj.materiaal, taakObj.aantal)
        const id = materiaal[0].id.toString()
        console.log(id)
        this.materiaalRepository.update(
          { id: materiaal[0].id },
          { aantal: materiaal[0].aantal + taakObj.aantal },
        )
      }

      await this.takenService.remove(id)
      return `taak verwijderd`
    }
  }
}
