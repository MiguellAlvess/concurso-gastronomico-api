import { faker } from '@faker-js/faker'
import { PostgresCreateDishRepository } from './create-dish.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Create Dish Repository', () => {
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
    it('should create dish on db', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })

        const sut = new PostgresCreateDishRepository(createDishParams)

        const result = await sut.execute(createDishParams)
        expect(result.id).toBe(createDishParams.id)
        expect(result.name).toBe(createDishParams.name)
        expect(String(result.price)).toBe(String(createDishParams.price))
        expect(result.details).toBe(createDishParams.details)
        expect(result.image_url).toBe(createDishParams.image_url)
        expect(result.restaurant_id).toBe(createDishParams.restaurant_id)
    })

    it('should call Prisma with correct params', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        const sut = new PostgresCreateDishRepository(createDishParams)
        const prismaSpy = import.meta.jest.spyOn(prisma.dish, 'create')

        await sut.execute(createDishParams)

        expect(prismaSpy).toHaveBeenCalledWith({
            data: createDishParams,
        })
    })

    it('should throw if Prisma throws', async () => {
        const sut = new PostgresCreateDishRepository(createDishParams)
        import.meta.jest
            .spyOn(prisma.dish, 'create')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(createDishParams)

        await expect(promise).rejects.toThrow()
    })
})
