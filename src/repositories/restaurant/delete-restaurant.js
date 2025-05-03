import { prisma } from '../../../prisma/prisma.js'

export class PostgresDeleteRestaurantRepository {
    async execute(restaurantId) {
        return await prisma.restaurant.delete({
            where: {
                id: restaurantId,
            },
        })
    }
}
