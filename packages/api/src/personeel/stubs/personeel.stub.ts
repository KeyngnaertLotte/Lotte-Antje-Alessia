import { CreatePersoneelInput } from '../dto/create-personeel.input';
import { Personeel } from '../entities/personeel.entity';

export const createPersoneelInputStub = (): CreatePersoneelInput => {
    const personeel = new CreatePersoneelInput();
    personeel.voornaam = '';
    personeel.achternaam = '';
    personeel.type = '';
    personeel.takenlijst = [];
    return personeel;
}

export const personeelStub = (): Personeel => {
    const personeel = new Personeel();
    personeel.id = 1;
    personeel.voornaam = '';
    personeel.achternaam = '';
    personeel.type = '';
    personeel.takenlijst = [];
    return personeel;
}