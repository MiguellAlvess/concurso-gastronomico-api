import { user } from '../../tests/index.js'
import { PostgresDeleteUserRepository } from './delete-user.js'
import { prisma } from '../../../prisma/prisma.js'
import { UserNotFoundError } from '../../errors/index.js'

describe('Delete User Repository', () => {
    it('should delete a user on db', async () => {
        await prisma.user.create({
            data: user,
        })
        const sut = new PostgresDeleteUserRepository()

        const result = await sut.execute(user.id)

        expect(result).toStrictEqual(user)
    })

    it('should call prisma with correct params', async () => {
        await prisma.user.create({
            data: user,
        })
        const sut = new PostgresDeleteUserRepository()
        const prismaSpy = import.meta.jest.spyOn(prisma.user, 'delete')

        await sut.execute(user.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: user.id,
            },
        })
    })

    it('should throw generic error if Prisma throws generic error', async () => {
        const sut = new PostgresDeleteUserRepository()
        import.meta.jest
            .spyOn(prisma.user, 'delete')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(user.id)

        await expect(promise).rejects.toThrow()
    })

    it('should throw UserNotFoundError if Prisma throws P2025 error', async () => {
        const sut = new PostgresDeleteUserRepository()
        import.meta.jest.spyOn(prisma.user, 'delete').mockRejectedValueOnce({
            name: 'PrismaClientKnownRequestError',
            code: 'P2025',
        })

        const promise = sut.execute(user.id)

        await expect(promise).rejects.toThrow(new UserNotFoundError(user.id))
    })
})
