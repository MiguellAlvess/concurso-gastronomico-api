import { prisma } from '../../../prisma/prisma.js'

export class PostgresCreateRestaurantRepository {
    async execute(createRestaurantParams) {
        return await prisma.restaurant.create({
            data: createRestaurantParams,
        })
    }
}
