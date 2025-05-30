import { review } from '../../tests/index.js'
import { PostgresDeleteReviewRepository } from './delete-review.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Delete Review Repository', () => {
    it('should throw generic error if Prisma throws generic error', async () => {
        const sut = new PostgresDeleteReviewRepository()
        import.meta.jest
            .spyOn(prisma.review, 'delete')
            .mockImplementationOnce(() => {
                throw new Error()
            })

        const promise = sut.execute(review.id)

        await expect(promise).rejects.toThrow()
    })
})
