import { prisma } from '../../../prisma/prisma'

export class PostgresGetReviewsByUserIdRepository {
    async execute(userId) {
        return await prisma.review.findMany({
            where: {
                user_id: userId,
            },
        })
    }
}
