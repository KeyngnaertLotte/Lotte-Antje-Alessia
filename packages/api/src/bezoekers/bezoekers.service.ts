import { Injectable } from '@nestjs/common';
import { CreateBezoekerInput } from './dto/create-bezoeker.input';
import { UpdateBezoekerInput } from './dto/update-bezoeker.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Bezoeker } from './entities/bezoeker.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb'
import { FavArtiest } from './entities/favartiest.entity';

@Injectable()
export class BezoekersService {
  constructor(
    @InjectRepository(Bezoeker)
    private readonly bezoekerRepository: Repository<Bezoeker>,
  ) {}

  create(createBezoekerInput: CreateBezoekerInput): Promise<Bezoeker> {	
    const b = new Bezoeker();
    b.uid = createBezoekerInput.uid;
    b.naam = createBezoekerInput.naam;
    b.saldo =  0;
    b.favoartiest = [];
    

    return this.bezoekerRepository.save(b);
  }

  findOneById(id: string): Promise<Bezoeker> {
    const obj = new ObjectId(id)
    // console.log(obj)
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
  


  // findAll() {
  //   return this.bezoekerRepository.find();
  // }

  // // findOne(id: number) {
  // //   return `This action returns a #${id} bezoeker`;
  // // }

  // update(id: number, updateBezoekerInput: UpdateBezoekerInput) {
  //   return `This action updates a #${id} bezoeker`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} bezoeker`;
  // }

  saveAll(bezoekers: Bezoeker[]) {
    return this.bezoekerRepository.save(bezoekers)
  }

  truncate() {
    return this.bezoekerRepository.clear()
  }
}
