import { prisma } from '../../../prisma/prisma'

export class PostgresCreateRestaurantRepository {
    async execute(createRestaurantParams) {
        return await prisma.restaurant.create({
            data: createRestaurantParams,
        })
    }
}
