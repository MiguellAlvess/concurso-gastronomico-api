import { review } from '../../tests/index.js'
import { PostgresGetReviewByIdRepository } from './get-review-by-id.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Get Review By Id Repository', () => {
    it('should call Prisma with correct params', async () => {
        const sut = new PostgresGetReviewByIdRepository()
        const prismaSpy = import.meta.jest.spyOn(prisma.review, 'findUnique')

        await sut.execute(review.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: review.id,
            },
        })
    })
})
