import { AnythingDto } from "../anythingDto";
import { faker } from '@faker-js/faker';

export class AnythingGenerator {

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
            { name: faker.person.firstName(), c: 0, d: false },
            { name: faker.person.firstName(), c: 1, d: true },
            { name: faker.person.firstName(), c: 2, d: true },
        ]
        return result;
    }

}