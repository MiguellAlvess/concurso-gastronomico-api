import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetReviewsByDishIdRepository {
    async execute(dishId) {
        return await prisma.review.findMany({
            where: {
                dish_id: dishId,
            },
        })
    }
}
