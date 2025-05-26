import { faker } from '@faker-js/faker'

export const restaurant = {
    id: faker.string.uuid(),
    name: faker.company.name(),
    cnpj: '40.947.067/0001-52',
    password: faker.internet.password({ length: 6 }),
    image_url: 'imagetest.png',
    file: {
        filename: 'imagetest.png',
        mimetype: 'image/png',
    },
}
