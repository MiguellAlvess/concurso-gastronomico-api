import { user } from '../../tests/index.js'
import { PostgresGetUserReviewsRepository } from './get-user-reviews.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Get User Reviews Repository', () => {
    it('should get user reviews on db', async () => {
        await prisma.user.create({
            data: user,
        })
        const sut = new PostgresGetUserReviewsRepository()

        const result = await sut.execute(user.id)

        expect(result).toStrictEqual([])
    })
})
