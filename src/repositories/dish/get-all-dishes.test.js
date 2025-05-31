import { faker } from '@faker-js/faker'
import { PostgresGetAllDishesRepository } from './get-all-dishes.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Get All Dishes Repository', () => {
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
    it('should return all dishes from the db', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        await prisma.dish.create({
            data: createDishParams,
        })
        const sut = new PostgresGetAllDishesRepository()

        const result = await sut.execute()

        expect(result[0].id).toBe(createDishParams.id)
        expect(result[0].name).toBe(createDishParams.name)
        expect(String(result[0].price)).toBe(String(createDishParams.price))
        expect(result[0].details).toBe(createDishParams.details)
        expect(result[0].image_url).toBe(createDishParams.image_url)
    })

    it('should call Prisma with correct params', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        await prisma.dish.create({
            data: createDishParams,
        })
        const sut = new PostgresGetAllDishesRepository()
        const prismaSpy = import.meta.jest.spyOn(prisma.dish, 'findMany')

        await sut.execute()

        expect(prismaSpy).toHaveBeenCalledWith({
            include: {
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        image_url: true,
                    },
                },
                reviews: {
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        user: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                            },
                        },
                    },
                },
            },
        })
    })
})
