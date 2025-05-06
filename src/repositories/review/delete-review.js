import { prisma } from '../../../prisma/prisma.js'

export class PostgresDeleteReviewRepository {
    async execute(reviewId) {
        try {
            return await prisma.review.delete({
                where: {
                    id: reviewId,
                },
            })
        } catch (error) {
            return null
        }
    }
}
