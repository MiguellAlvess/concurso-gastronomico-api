import { prisma } from '../../../prisma/prisma.js'
import { ReviewNotFoundError } from '../../errors/review.js'

export class PostgresDeleteReviewRepository {
    async execute(reviewId) {
        try {
            return await prisma.review.delete({
                where: {
                    id: reviewId,
                },
            })
        } catch (error) {
            if (error.name === 'PrismaClientKnownRequestError') {
                // P2025 -> An operation failed because it depends on one or more records that were required but not found. {cause}
                if (error.code === 'P2025') {
                    throw new ReviewNotFoundError(reviewId)
                }
            }

            throw error
        }
    }
}
