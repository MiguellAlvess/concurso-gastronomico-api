import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetReviewByIdRepository {
    async execute(reviewId) {
        await prisma.review.findUnique({
            where: {
                id: reviewId,
            },
        })
    }
}
