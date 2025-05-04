import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetDishesByRestaurantIdRepository {
    async execute(restaurantId) {
        return await prisma.dish.findMany({
            where: {
                restaurant_id: restaurantId,
            },
        })
    }
}
