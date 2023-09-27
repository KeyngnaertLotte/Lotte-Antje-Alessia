import { Injectable } from '@nestjs/common';
import { CreatePersoneelInput } from './dto/create-personeel.input';
import { UpdatePersoneelInput } from './dto/update-personeel.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Personeel } from './entities/personeel.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class PersoneelService {
  constructor(
    @InjectRepository(Personeel)
    private readonly personeelRepository: Repository<Personeel>,
  ) {}


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

  findOneById(id: string): Promise<Personeel> {
    const obj = new Object(id)
    console.log(obj)
    // @ts-ignore
    return this.personeelRepository.findOne({_id: new ObjectId(id)})
  }

  update(id: number, updatePersoneelInput: UpdatePersoneelInput) {
    return `This action updates a #${id} personeel`;
  }

  remove(id: number) {
    return `This action removes a #${id} personeel`;
  }
}
