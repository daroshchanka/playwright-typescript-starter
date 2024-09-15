import { AnythingDto } from "../anythingDto";
import { faker } from '@faker-js/faker';

export class AnythingGeterator {

    static generate(): AnythingDto {
        let result = new AnythingDto();
        result.keyString = faker.science.chemicalElement().name;
        result.keyBoolean = Math.random() < 0.5;
        result.keyNumber = Math.random();
        result.keyArrayString = [
            faker.animal.bird.name,
            faker.animal.cat.name,
            faker.animal.bear.name,
        ]
        result.keyArrayObj = [
            { name: faker.name.firstName(), c: 0, d: false },
            { name: faker.name.firstName(), c: 1, d: true },
            { name: faker.name.firstName(), c: 2, d: true },
        ]
        return result;
    }

}