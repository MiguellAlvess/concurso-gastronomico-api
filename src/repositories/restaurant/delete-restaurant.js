import { prisma } from '../../../prisma/prisma.js'

export class PostgresDeleteRestaurantRepository {
    async execute(restaurantId) {
        try {
            return await prisma.restaurant.delete({
                where: {
                    id: restaurantId,
                },
            })
        } catch (error) {
            return null
        }
    }
}
