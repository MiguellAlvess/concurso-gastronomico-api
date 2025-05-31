import { faker } from '@faker-js/faker'
import { PostgresGetDishesByRestaurantIdRepository } from './get-dishes-by-restaurant-id.js'
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

    it('should get dishes by restaurant id on db', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        await prisma.dish.create({
            data: createDishParams,
        })
        const sut = new PostgresGetDishesByRestaurantIdRepository(
            createRestaurantParams.id,
        )

        const result = await sut.execute(createRestaurantParams.id)

        expect(result[0].id).toBe(createDishParams.id)
    })

    it('should call Prisma with correct params', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        await prisma.dish.create({
            data: createDishParams,
        })
        const sut = new PostgresGetDishesByRestaurantIdRepository(
            createRestaurantParams.id,
        )
        const prismaSpy = import.meta.jest.spyOn(prisma.dish, 'findMany')

        await sut.execute(createRestaurantParams.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                restaurant_id: createRestaurantParams.id,
            },
        })
    })
})
