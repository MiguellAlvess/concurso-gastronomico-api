import { faker } from '@faker-js/faker'
import { PostgresGetDishByIdRepository } from './get-dish-by-id.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Get Dish By Id Repository', () => {
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
    it('should get dish by id on db', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        await prisma.dish.create({
            data: createDishParams,
        })
        const sut = new PostgresGetDishByIdRepository()

        const result = await sut.execute(createDishParams.id)

        expect(result.id).toBe(createDishParams.id)
    })

    it('should call Prisma with correct params', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        await prisma.dish.create({
            data: createDishParams,
        })
        const sut = new PostgresGetDishByIdRepository()
        const prismaSpy = import.meta.jest.spyOn(prisma.dish, 'findUnique')

        await sut.execute(createDishParams.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: createDishParams.id,
            },
        })
    })

    it('should throw if Prisma throws', async () => {
        const sut = new PostgresGetDishByIdRepository()
        import.meta.jest
            .spyOn(prisma.dish, 'findUnique')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(createDishParams.id)

        await expect(promise).rejects.toThrow()
    })
})
