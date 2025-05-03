import { prisma } from '../../../prisma/prisma.js'

export class PostgresUpdateRestaurantRepository {
    async execute(restaurantId, updateRestaurantParams) {
        return await prisma.restaurant.update({
            where: {
                id: restaurantId,
            },
            data: updateRestaurantParams,
        })
    }
}
