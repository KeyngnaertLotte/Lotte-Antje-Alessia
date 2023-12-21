import { Injectable } from '@nestjs/common'
import { CreateBezoekerInput } from './dto/create-bezoeker.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Bezoeker } from './entities/bezoeker.entity'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { FavArtiest } from './entities/favartiest.entity'
import { Transactie } from './entities/transacties.entity'

@Injectable()
export class BezoekersService {
  constructor(
    @InjectRepository(Bezoeker)
    private readonly bezoekerRepository: Repository<Bezoeker>,
  ) {}

  create(createBezoekerInput: CreateBezoekerInput): Promise<Bezoeker> {
    const b = new Bezoeker()
    b.uid = createBezoekerInput.uid
    b.naam = createBezoekerInput.naam
    b.saldo = 0
    b.favoartiest = []
    b.transacties = []

    return this.bezoekerRepository.save(b)
  }

  findOneById(id: string): Promise<Bezoeker> {
    const obj = new ObjectId(id)
    // @ts-ignore
    return this.bezoekerRepository.findOne({ _id: new ObjectId(id) })
  }
  findOneByUid(uid: string): Promise<Bezoeker> {
    return this.bezoekerRepository.findOneByOrFail({ uid })
  }

  async findFavoArtiestsByUid(uid: string): Promise<FavArtiest[]> {
    const bezoeker = await this.bezoekerRepository.findOneByOrFail({ uid })
    return bezoeker?.favoartiest || []
  }

  async addFavoArtiest(uid: string, favoartiest: string) {
    // Retrieve the Bezoeker by ID
    const bezoeker = await this.bezoekerRepository.findOneByOrFail({ uid })

    const newFavoArtiest = new FavArtiest()
    if (favoartiest === 'TOM MISH') {
      newFavoArtiest.artiest = favoartiest
      newFavoArtiest.startTime = '20:15'
      newFavoArtiest.endTime = '21:30'
      newFavoArtiest.color = 'darkGreen'
    } else if (favoartiest === 'BRIHANG') {
      newFavoArtiest.artiest = favoartiest
      newFavoArtiest.startTime = '22:00'
      newFavoArtiest.endTime = '23:15'
      newFavoArtiest.color = 'darkGreen'
    } else if (favoartiest === 'BERIGHTBACK') {
      newFavoArtiest.artiest = favoartiest
      newFavoArtiest.startTime = '23:45'
      newFavoArtiest.endTime = '01:00'
      newFavoArtiest.color = 'darkGreen'
    } else if (favoartiest === 'BOHNES') {
      newFavoArtiest.artiest = favoartiest
      newFavoArtiest.startTime = '20:00'
      newFavoArtiest.endTime = '21:30'
      newFavoArtiest.color = 'purple'
    } else if (favoartiest === 'ASTON') {
      newFavoArtiest.artiest = favoartiest
      newFavoArtiest.startTime = '21:45'
      newFavoArtiest.endTime = '22:45'
      newFavoArtiest.color = 'purple'
    } else if (favoartiest === 'NF') {
      newFavoArtiest.artiest = favoartiest
      newFavoArtiest.startTime = '23:00'
      newFavoArtiest.endTime = '00:30'
      newFavoArtiest.color = 'purple'
    } else if (favoartiest === 'THEFATRAT') {
      newFavoArtiest.artiest = favoartiest
      newFavoArtiest.startTime = '20:00'
      newFavoArtiest.endTime = '21:00'
      newFavoArtiest.color = 'orange'
    } else if (favoartiest === 'NEFFEX') {
      newFavoArtiest.artiest = favoartiest
      newFavoArtiest.startTime = '21:15'
      newFavoArtiest.endTime = '22:15'
      newFavoArtiest.color = 'orange'
    } else if (favoartiest === 'BOYWITHUKE') {
      newFavoArtiest.artiest = favoartiest
      newFavoArtiest.startTime = '22:30'
      newFavoArtiest.endTime = '23:30'
      newFavoArtiest.color = 'orange'
    } else if (favoartiest === 'IMAGINE DRAGONS') {
      newFavoArtiest.artiest = favoartiest
      newFavoArtiest.startTime = '23:45'
      newFavoArtiest.endTime = '00:45'
      newFavoArtiest.color = 'orange'
    }

    bezoeker.favoartiest.push(newFavoArtiest)

    return this.bezoekerRepository.save(bezoeker)
  }

  async removeFavoArtiest(uid: string, favoartiest: string) {
    // Retrieve the Bezoeker by ID
    const bezoeker = await this.bezoekerRepository.findOneByOrFail({ uid })

    // Remove the FavArtiest from the Bezoeker
    bezoeker.favoartiest = bezoeker.favoartiest.filter(
      f => f.artiest !== favoartiest,
    )

    return this.bezoekerRepository.save(bezoeker)
  }

  async addSaldo(uid: string, saldo: number) {
    // Retrieve the Bezoeker by ID
    const bezoeker = await this.bezoekerRepository.findOneByOrFail({ uid })

    const newTransactie = new Transactie()
    newTransactie.aantal = saldo
    newTransactie.tijd = new Date()
    newTransactie.transactie = 'Saldo Verhoging'

    bezoeker.transacties.push(newTransactie)

    bezoeker.saldo = bezoeker.saldo + saldo

    return this.bezoekerRepository.save(bezoeker)
  }

  async removeSaldo(uid: string, saldo: number, transactie: string) {
    // Retrieve the Bezoeker by ID
    const bezoeker = await this.bezoekerRepository.findOneByOrFail({ uid })

    const newTransactie = new Transactie()
    newTransactie.aantal = saldo
    newTransactie.tijd = new Date()
    newTransactie.transactie = transactie

    bezoeker.transacties.push(newTransactie)

    bezoeker.saldo = bezoeker.saldo - saldo

    return this.bezoekerRepository.save(bezoeker)
  }

  saveAll(bezoekers: Bezoeker[]) {
    return this.bezoekerRepository.save(bezoekers)
  }

  truncate() {
    return this.bezoekerRepository.clear()
  }
}
