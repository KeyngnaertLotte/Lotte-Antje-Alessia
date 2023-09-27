import { Injectable } from '@nestjs/common';
import { CreatePersoneelInput } from './dto/create-personeel.input';
import { UpdatePersoneelInput } from './dto/update-personeel.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Personeel } from './entities/personeel.entity';

@Injectable()
export class PersoneelService {
  constructor(
    @InjectRepository(Personeel)
    private readonly personeelRepository: Repository<Personeel>,
  ) {}

  // create(createPersoneelInput: CreatePersoneelInput) {
  //   return 'This action adds a new personeel';
  // }
  create(createPersoneelInput: CreatePersoneelInput): Promise<Personeel> {
    const p = new Personeel()
    p.voornaam = createPersoneelInput.voornaam
    p.achternaam = createPersoneelInput.achternaam
    p.telefoon = createPersoneelInput.telefoon

    return this.personeelRepository.save(p)
  }

  findAll() {
    return this.personeelRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} personeel`;
  }

  update(id: number, updatePersoneelInput: UpdatePersoneelInput) {
    return `This action updates a #${id} personeel`;
  }

  remove(id: number) {
    return `This action removes a #${id} personeel`;
  }
}
