import { faker } from '@faker-js/faker'
import { PostgresGetRestaurantByCnpjRepository } from './get-restaurant-by-cnpj.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Get Restaurant By Cnpj Repository', () => {
    const createRestaurantParams = {
        id: faker.string.uuid(),
        name: faker.company.name(),
        cnpj: '40.947.067/0001-52',
        password: faker.internet.password({ length: 6 }),
        image_url: 'imagetest.png',
    }

    it('should get restaurant by cnpj on db', async () => {
        await prisma.restaurant.create({
            data: createRestaurantParams,
        })
        const sut = new PostgresGetRestaurantByCnpjRepository()

        const result = await sut.execute(createRestaurantParams.cnpj)

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
        const sut = new PostgresGetRestaurantByCnpjRepository()
        const prismaSpy = import.meta.jest.spyOn(
            prisma.restaurant,
            'findUnique',
        )

        await sut.execute(createRestaurantParams.cnpj)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                cnpj: createRestaurantParams.cnpj,
            },
        })
    })

    it('should throw if Prisma throws', async () => {
        const sut = new PostgresGetRestaurantByCnpjRepository()
        import.meta.jest
            .spyOn(prisma.restaurant, 'findUnique')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(createRestaurantParams.cnpj)

        await expect(promise).rejects.toThrow()
    })
})
