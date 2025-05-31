import { faker } from '@faker-js/faker'
import { PostgresGetDishReviewsRepository } from './get-dish-reviews.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Get Dish Reviews Repository', () => {
    const createRestaurantParams = {
        id: faker.string.uuid(),
        name: faker.company.name(),
        cnpj: '40.947.067/0001-50',
        password: faker.internet.password({ length: 6 }),
        image_url: 'imagetest.png',
    }

    const createDishParams = {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        details: faker.commerce.productDescription().slice(0, 255),
        price: faker.finance.amount(),
        restaurant_id: createRestaurantParams.id,
        image_url: 'imagetest.png',
    }

    it('should throw if Prisma throws', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        await prisma.dish.create({
            data: createDishParams,
        })
        const sut = new PostgresGetDishReviewsRepository(createDishParams.id)
        import.meta.jest
            .spyOn(prisma.review, 'findMany')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(createDishParams.id)

        await expect(promise).rejects.toThrow()
    })
})
