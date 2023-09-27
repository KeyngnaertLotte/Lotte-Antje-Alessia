import { Injectable } from '@nestjs/common'
import { CreateArtiestenInput } from './dto/create-artiesten.input'
import { UpdateArtiestenInput } from './dto/update-artiesten.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Artiesten } from './entities/artiesten.entity'

@Injectable()
export class ArtiestenService {
  constructor(
    @InjectRepository(Artiesten)
    private readonly artiestRepository: Repository<Artiesten>,
  ) {}

  create(createArtiestenInput: CreateArtiestenInput) {
    const a = new Artiesten()
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

  update(id: number, updateArtiestenInput: UpdateArtiestenInput) {
    return `This action updates a #${id} artiesten`
  }

  remove(id: number) {
    return `This action removes a #${id} artiesten`
  }
}
