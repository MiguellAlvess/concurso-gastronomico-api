import { faker } from '@faker-js/faker'
import { PostgresGetRestaurantByIdRepository } from './get-restaurant-by-id.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Get Restaurant By Id Repository', () => {
    const createRestaurantParams = {
        id: faker.string.uuid(),
        name: faker.company.name(),
        cnpj: '40.947.067/0001-50',
        password: faker.internet.password({ length: 6 }),
        image_url: 'imagetest.png',
    }

    it('should get restaurant by id on db', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        const sut = new PostgresGetRestaurantByIdRepository()

        const result = await sut.execute(createRestaurantParams.id)

        expect(result.id).toBe(createRestaurantParams.id)
        expect(result.name).toBe(createRestaurantParams.name)
        expect(result.cnpj).toBe(createRestaurantParams.cnpj)
        expect(result.password).toBe(createRestaurantParams.password)
        expect(result.image_url).toBe(createRestaurantParams.image_url)
    })

    it('should call Prisma with correct params', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        const sut = new PostgresGetRestaurantByIdRepository()
        const prismaSpy = import.meta.jest.spyOn(
            prisma.restaurant,
            'findUnique',
        )

        await sut.execute(createRestaurantParams.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: createRestaurantParams.id,
            },
        })
    })

    it('should throw if Prisma throws', async () => {
        const sut = new PostgresGetRestaurantByIdRepository()
        import.meta.jest
            .spyOn(prisma.restaurant, 'findUnique')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(createRestaurantParams.id)

        await expect(promise).rejects.toThrow()
    })
})
