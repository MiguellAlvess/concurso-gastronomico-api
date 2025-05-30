import { PostgresCheckUserReviewRepository } from './check-user-review.js'
import { prisma } from '../../../prisma/prisma.js'
import { review, dish } from '../../tests/index.js'

describe('Check User Review Repository', () => {
    it('should call Prisma with correct params', async () => {
        const sut = new PostgresCheckUserReviewRepository()
        const prismaSpy = import.meta.jest.spyOn(prisma.review, 'findFirst')

        await sut.execute(review.user_id, dish.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: review.user_id,
                dish_id: dish.id,
            },
        })
    })

    it('should throw if Prisma throws', async () => {
        const sut = new PostgresCheckUserReviewRepository()
        import.meta.jest
            .spyOn(prisma.review, 'findFirst')
            .mockImplementationOnce(() => {
                throw new Error()
            })

        const promise = sut.execute(review.user_id, dish.id)

        await expect(promise).rejects.toThrow()
    })
})
