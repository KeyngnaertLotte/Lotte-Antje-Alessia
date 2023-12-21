import { CreateBezoekerInput } from "../dto/create-bezoeker.input";
import { Bezoeker } from "../entities/bezoeker.entity";

export const createBezoekerInputStub = (): CreateBezoekerInput => {
    const b = new CreateBezoekerInput();
    b.uid = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    b.naam = 'test';
    return b;
}

export const bezoekerStub = (): Bezoeker => {
    const b = new Bezoeker();
    b.uid = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    b.naam = 'test';
    b.saldo = 0;
    b.favoartiest = [];
    b.transacties = [];
    return b;
}
