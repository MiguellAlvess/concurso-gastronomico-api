import { faker } from '@faker-js/faker'

export const restaurant = {
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    cnpj: '40.947.067/0001-52',
    password: faker.internet.password({
        length: 6,
    }),
}
