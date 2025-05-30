import { PostgresCreateReviewRepository } from './create-review.js'
import { prisma } from '../../../prisma/prisma.js'
import { review } from '../../tests/index.js'

describe('Create Review Repository', () => {
    it('should throw if Prisma throws', async () => {
        const sut = new PostgresCreateReviewRepository()
        import.meta.jest
            .spyOn(prisma.review, 'create')
            .mockImplementationOnce(() => {
                throw new Error()
            })

        const promise = sut.execute(review)

        await expect(promise).rejects.toThrow()
    })
})
