import { prisma } from '../../../prisma/prisma.js'
import { RestaurantNotFoundError } from '../../errors/restaurant.js'

export class PostgresDeleteRestaurantRepository {
    async execute(restaurantId) {
        try {
            return await prisma.restaurant.delete({
                where: {
                    id: restaurantId,
                },
            })
        } catch (error) {
            if (error.name === 'PrismaClientKnownRequestError') {
                // P2025 -> An operation failed because it depends on one or more records that were required but not found. {cause}
                if (error.code === 'P2025') {
                    throw new RestaurantNotFoundError(restaurantId)
                }
            }

            throw error
        }
    }
}
