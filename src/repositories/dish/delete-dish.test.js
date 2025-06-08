import { PostgresDeleteDishRepository } from './delete-dish.js'
import { faker } from '@faker-js/faker'
import { prisma } from '../../../prisma/prisma.js'

describe('Delete Dish Repository', () => {
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
        price: '50',
        restaurant_id: createRestaurantParams.id,
        image_url: 'imagetest.png',
    }

    it('should delete dish on db', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        await prisma.dish.create({
            data: createDishParams,
        })
        const sut = new PostgresDeleteDishRepository(createDishParams.id)

        const result = await sut.execute(createDishParams.id)

        expect({
            ...result,
            price: result.price.toString(),
        }).toStrictEqual(createDishParams)
    })

    it('should call Prisma with correct params', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        await prisma.dish.create({
            data: createDishParams,
        })
        const sut = new PostgresDeleteDishRepository(createDishParams.id)
        const prismaSpy = import.meta.jest.spyOn(prisma.dish, 'delete')

        await sut.execute(createDishParams.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: createDishParams.id,
            },
        })
    })

    it('should throw generic error if Prisma throws generic error', async () => {
        const sut = new PostgresDeleteDishRepository(createDishParams.id)
        import.meta.jest
            .spyOn(prisma.dish, 'delete')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(createDishParams.id)

        await expect(promise).rejects.toThrow()
    })

    it('should throw DishNotFoundError if Prisma throws P2025 error', async () => {
        const sut = new PostgresDeleteDishRepository(createDishParams.id)
        import.meta.jest.spyOn(prisma.dish, 'delete').mockRejectedValueOnce({
            name: 'PrismaClientKnownRequestError',
            code: 'P2025',
        })

        const promise = sut.execute(createDishParams.id)

        await expect(promise).rejects.toThrow()
    })
})
