import { Injectable } from '@nestjs/common'
import { CreateArtiestenInput } from './dto/create-artiesten.input'
import { UpdateArtiestenInput } from './dto/update-artiesten.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Artiest } from './entities/artiesten.entity'
import { ObjectId } from 'mongodb'

@Injectable()
export class ArtiestenService {
  constructor(
    @InjectRepository(Artiest)
    private readonly artiestRepository: Repository<Artiest>,
  ) {}

  create(createArtiestenInput: CreateArtiestenInput): Promise<Artiest> {
    const a = new Artiest()
    a.naam = createArtiestenInput.naam
    a.podium = createArtiestenInput.podium
    // return 'This action adds a new artiesten'
    return this.artiestRepository.save(a)
  }

  findAll() {
    return this.artiestRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} artiesten`
  }

  findOneById(id: string): Promise<Artiest> {
    const obj = new ObjectId(id)
    // @ts-ignore
    return this.artiestRepository.findOne({ _id: new ObjectId(id) })
  }

  update(id: number, updateArtiestenInput: UpdateArtiestenInput) {
    return `This action updates a #${id} artiesten`
  }

  remove(id: number) {
    return `This action removes a #${id} artiesten`
  }

  saveAll(artiesten: Artiest[]) {
    return this.artiestRepository.save(artiesten)
  }

  truncate() {
    return this.artiestRepository.clear()
  }
}
