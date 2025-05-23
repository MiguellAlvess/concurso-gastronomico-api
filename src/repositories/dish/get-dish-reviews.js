import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetDishReviewsRepository {
    async execute(dishId) {
        return await prisma.review.findMany({
            where: {
                dish_id: dishId,
            },
        })
    }
}
