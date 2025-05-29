import { user } from '../../tests/index.js'
import { PostgresUpdateUserRepository } from './update-user.js'
import { prisma } from '../../../prisma/prisma.js'
import { faker } from '@faker-js/faker'
import { UserNotFoundError } from '../../errors/user.js'

describe('Update User Repository', () => {
    const updateUserParams = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }
    it('should update user on db', async () => {
        await prisma.user.create({
            data: user,
        })
        const sut = new PostgresUpdateUserRepository()

        const result = await sut.execute(user.id, updateUserParams)

        expect(result).toStrictEqual(updateUserParams)
    })

    it('should call Prisma with correct params', async () => {
        await prisma.user.create({
            data: user,
        })
        const sut = new PostgresUpdateUserRepository()
        const prismaSpy = import.meta.jest.spyOn(prisma.user, 'update')

        await sut.execute(user.id, updateUserParams)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: user.id,
            },
            data: updateUserParams,
        })
    })

    it('should throw generic error if Prisma throws generic error', async () => {
        const sut = new PostgresUpdateUserRepository()
        import.meta.jest
            .spyOn(prisma.user, 'update')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(user.id, updateUserParams)

        await expect(promise).rejects.toThrow()
    })

    it('should throw UserNotFoundError if Prisma throws P2025 error', async () => {
        const sut = new PostgresUpdateUserRepository()
        import.meta.jest.spyOn(prisma.user, 'update').mockRejectedValueOnce({
            name: 'PrismaClientKnownRequestError',
            code: 'P2025',
        })

        const promise = sut.execute(user.id, updateUserParams)

        await expect(promise).rejects.toThrow(new UserNotFoundError(user.id))
    })
})
