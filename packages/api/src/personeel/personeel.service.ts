import { Injectable } from '@nestjs/common';
import { CreatePersoneelInput } from './dto/create-personeel.input';
import { UpdatePersoneelInput } from './dto/update-personeel.input';

@Injectable()
export class PersoneelService {
  create(createPersoneelInput: CreatePersoneelInput) {
    return 'This action adds a new personeel';
  }

  findAll() {
    return `This action returns all personeel`;
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
