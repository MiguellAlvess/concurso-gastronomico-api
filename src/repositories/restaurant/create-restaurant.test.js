import { PostgresCreateRestaurantRepository } from './create-restaurant.js'
import { faker } from '@faker-js/faker'

describe('Create Restaurant Repository', () => {
    const createRestaurantParams = {
        id: faker.string.uuid(),
        name: faker.company.name(),
        cnpj: '40.947.067/0001-52',
        password: faker.internet.password({ length: 6 }),
        image_url: 'imagetest.png',
    }
    it('should create restaurant on db', async () => {
        const sut = new PostgresCreateRestaurantRepository()

        const result = await sut.execute(createRestaurantParams)

        expect(result.id).toBe(createRestaurantParams.id)
        expect(result.name).toBe(createRestaurantParams.name)
        expect(result.cnpj).toBe(createRestaurantParams.cnpj)
        expect(result.email).toBe(createRestaurantParams.email)
        expect(result.password).toBe(createRestaurantParams.password)
        expect(result.image_url).toBe(createRestaurantParams.image_url)
    })
})
