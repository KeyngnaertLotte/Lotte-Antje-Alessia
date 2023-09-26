import { Injectable } from '@nestjs/common';
import { CreateBezoekerInput } from './dto/create-bezoeker.input';
import { UpdateBezoekerInput } from './dto/update-bezoeker.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Bezoeker } from './entities/bezoeker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BezoekersService {
  constructor(
    @InjectRepository(Bezoeker)
    private readonly bezoekerRepository: Repository<Bezoeker>,
  ) {}

  create(createBezoekerInput: CreateBezoekerInput) {
    return 'This action adds a new bezoeker';
  }

  findAll() {
    return this.bezoekerRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} bezoeker`;
  }

  update(id: number, updateBezoekerInput: UpdateBezoekerInput) {
    return `This action updates a #${id} bezoeker`;
  }

  remove(id: number) {
    return `This action removes a #${id} bezoeker`;
  }
}
