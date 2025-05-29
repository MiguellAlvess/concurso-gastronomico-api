import { user } from '../../tests/index.js'
import { PostgresGetUserByEmailRepository } from './get-user-by-email.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Get User By Email Repository', () => {
    it('should get user by email on db', async () => {
        await prisma.user.create({
            data: user,
        })
        const sut = new PostgresGetUserByEmailRepository()

        const result = await sut.execute(user.email)

        expect(result.id).toBe(user.id)
        expect(result.name).toBe(user.name)
        expect(result.email).toBe(user.email)
        expect(result.password).toBe(user.password)
    })
})
