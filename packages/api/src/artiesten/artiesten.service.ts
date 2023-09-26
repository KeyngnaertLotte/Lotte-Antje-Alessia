import { Injectable } from '@nestjs/common';
import { CreateArtiestenInput } from './dto/create-artiesten.input';
import { UpdateArtiestenInput } from './dto/update-artiesten.input';

@Injectable()
export class ArtiestenService {
  create(createArtiestenInput: CreateArtiestenInput) {
    return 'This action adds a new artiesten';
  }

  findAll() {
    return `This action returns all artiesten`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artiesten`;
  }

  update(id: number, updateArtiestenInput: UpdateArtiestenInput) {
    return `This action updates a #${id} artiesten`;
  }

  remove(id: number) {
    return `This action removes a #${id} artiesten`;
  }
}
