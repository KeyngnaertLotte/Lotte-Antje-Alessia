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
    p.uid = createPersoneelInput.uid
    p.voornaam = createPersoneelInput.voornaam
    p.achternaam = createPersoneelInput.achternaam
    p.takenlijst = []
    p.type = createPersoneelInput.type

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

  findOneByUid(uid: string): Promise<Personeel> {
    return this.personeelRepository.findOneByOrFail({ uid })
  }

  update(id: number, updatePersoneelInput: UpdatePersoneelInput) {
    return `This action updates a #${id} personeel`;
  }

  remove(id: number) {
    return `This action removes a #${id} personeel`;
  }

  saveAll(personeel: Personeel[]) {
    return this.personeelRepository.save(personeel)
  }

  truncate() {
    return this.personeelRepository.clear()
  }
  
}
