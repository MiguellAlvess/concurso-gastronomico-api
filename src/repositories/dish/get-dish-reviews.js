import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetDishReviewsRepository {
    async execute(dishId) {
        const reviews = await prisma.review.findMany({
            where: {
                dish_id: dishId,
            },
        })

        const { _avg: average } = await prisma.review.aggregate({
            where: {
                dish_id: dishId,
            },
            _avg: {
                rating: true,
            },
        })

        return {
            reviews,
            averageRating: average.rating
                ? Number(average.rating.toFixed(1))
                : 0,
        }
    }
}
