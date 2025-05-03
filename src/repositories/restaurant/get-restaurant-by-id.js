import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetRestaurantByIdRepository {
    async execute(restaurantId) {
        return await prisma.restaurant.findUnique({
            where: {
                id: restaurantId,
            },
        })
    }
}
