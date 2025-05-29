import { faker } from '@faker-js/faker'
import { PostgresDeleteRestaurantRepository } from './delete-restaurant.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Delete Restaurant Repository', () => {
    const createRestaurantParams = {
        id: faker.string.uuid(),
        name: faker.company.name(),
        cnpj: '40.947.067/0001-52',
        password: faker.internet.password({ length: 6 }),
        image_url: 'imagetest.png',
    }

    it('should delete a restaurant on db', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        const sut = new PostgresDeleteRestaurantRepository()

        const result = await sut.execute(createRestaurantParams.id)

        expect(result).toStrictEqual(createRestaurantParams)
    })
})
