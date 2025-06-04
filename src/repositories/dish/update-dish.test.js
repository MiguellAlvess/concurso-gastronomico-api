import { faker } from '@faker-js/faker'
import { PostgresUpdateDishRepository } from './update-dish.js'
import { prisma } from '../../../prisma/prisma.js'
import { DishNotFoundError } from '../../errors/dish.js'

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
        price: '100',
        restaurant_id: createRestaurantParams.id,
        image_url: 'imagetest.png',
    }

    const updateDishParams = {
        name: faker.commerce.productName(),
        details: faker.commerce.productDescription().slice(0, 255),
        price: '120',
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

    it('should throw generic error if Prisma throws generic error', async () => {
        const sut = new PostgresUpdateDishRepository()
        import.meta.jest
            .spyOn(prisma.dish, 'update')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(createDishParams.id, updateDishParams)

        await expect(promise).rejects.toThrow(new Error())
    })

    it('should throw DishNotFoundError if Prisma throws P2025 error', async () => {
        const sut = new PostgresUpdateDishRepository()
        import.meta.jest.spyOn(prisma.dish, 'update').mockRejectedValueOnce({
            name: 'PrismaClientKnownRequestError',
            code: 'P2025',
        })

        const promise = sut.execute(createDishParams.id, updateDishParams)

        await expect(promise).rejects.toThrow(
            new DishNotFoundError(createDishParams.id),
        )
    })
})
