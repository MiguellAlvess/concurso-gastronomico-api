import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetUserReviewsRepository {
    async execute(userId) {
        return await prisma.review.findMany({
            where: {
                user_id: userId,
            },
        })
    }
}
