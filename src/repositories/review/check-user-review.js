import { prisma } from '../../../prisma/prisma.js'

export class PostgresCheckUserReviewRepository {
    async execute(userId, dishId) {
        return await prisma.review.findFirst({
            where: {
                user_id: userId,
                dish_id: dishId,
            },
        })
    }
}
