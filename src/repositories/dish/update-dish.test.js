import { faker } from '@faker-js/faker'
import { PostgresUpdateDishRepository } from './update-dish.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Update Dish Repository', () => {
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
        price: String(faker.finance.amount()),
        restaurant_id: createRestaurantParams.id,
        image_url: 'imagetest.png',
    }

    const updateDishParams = {
        name: faker.commerce.productName(),
        details: faker.commerce.productDescription().slice(0, 255),
        price: String(faker.finance.amount()),
        restaurant_id: createRestaurantParams.id,
        image_url: 'imagetest.png',
    }
    it('should update a dish on db', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        await prisma.dish.create({
            data: createDishParams,
        })
        const sut = new PostgresUpdateDishRepository()

        const result = await sut.execute(createDishParams.id, updateDishParams)

        expect({
            ...result,
            price: result.price.toString(),
        }).toStrictEqual({
            id: createDishParams.id,
            ...updateDishParams,
            price: updateDishParams.price,
        })
    })

    it('should call Prisma with correct params', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        await prisma.dish.create({
            data: createDishParams,
        })
        const sut = new PostgresUpdateDishRepository()
        const prismaSpy = import.meta.jest.spyOn(prisma.dish, 'update')

        await sut.execute(createDishParams.id, updateDishParams)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: createDishParams.id,
            },
            data: updateDishParams,
        })
    })
})
