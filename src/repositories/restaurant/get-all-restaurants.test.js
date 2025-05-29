import { faker } from '@faker-js/faker'
import { PostgresGetAllRestaurantsRepository } from './get-all-restaurants.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Get All Restaurants Repository', () => {
    const createRestaurantParams = {
        id: faker.string.uuid(),
        name: faker.company.name(),
        cnpj: '40.947.067/0001-52',
        password: faker.internet.password({ length: 6 }),
        image_url: 'imagetest.png',
    }

    it('should get all restaurants on db', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        const sut = new PostgresGetAllRestaurantsRepository()

        const result = await sut.execute()

        expect(result[0].id).toBe(createRestaurantParams.id)
        expect(result[0].name).toBe(createRestaurantParams.name)
        expect(result[0].image_url).toBe(createRestaurantParams.image_url)
    })

    it('should throw if Prisma throws', async () => {
        const sut = new PostgresGetAllRestaurantsRepository()
        import.meta.jest
            .spyOn(prisma.restaurant, 'findMany')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute()

        await expect(promise).rejects.toThrow()
    })
})
