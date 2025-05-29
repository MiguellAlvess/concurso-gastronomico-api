import { user } from '../../tests/index.js'
import { PostgresUpdateUserRepository } from './update-user.js'
import { prisma } from '../../../prisma/prisma.js'
import { faker } from '@faker-js/faker'

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
})
