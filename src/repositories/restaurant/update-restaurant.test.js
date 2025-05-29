import { faker } from '@faker-js/faker'
import { PostgresUpdateRestaurantRepository } from './update-restaurant.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Update Restaurant Repository', () => {
    const updateRestaurantParams = {
        id: faker.string.uuid(),
        name: faker.company.name(),
        cnpj: '40.947.067/0001-50',
        password: faker.internet.password({ length: 6 }),
        image_url: 'imagetest.png',
    }

    it('should update a restaurant on db', async () => {
        await prisma.restaurant.create({
            data: updateRestaurantParams,
        })
        const sut = new PostgresUpdateRestaurantRepository()

        const result = await sut.execute(
            updateRestaurantParams.id,
            updateRestaurantParams,
        )

        expect(result).toStrictEqual(updateRestaurantParams)
    })
})
