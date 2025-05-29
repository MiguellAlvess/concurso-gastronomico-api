import { user } from '../../tests/index.js'
import { PostgresGetUserByIdRepository } from './get-user-by-id.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Get User By Id Repository', () => {
    it('should get user by id on db', async () => {
        await prisma.user.create({
            data: user,
        })
        const sut = new PostgresGetUserByIdRepository()

        const result = await sut.execute(user.id)

        expect(result.id).toBe(user.id)
        expect(result.name).toBe(user.name)
        expect(result.email).toBe(user.email)
        expect(result.password).toBe(user.password)
    })

    it('should call Prisma with correct params', async () => {
        await prisma.user.create({
            data: user,
        })
        const sut = new PostgresGetUserByIdRepository()
        const prismaSpy = import.meta.jest.spyOn(prisma.user, 'findUnique')

        await sut.execute(user.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: user.id,
            },
        })
    })
})
