import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetAllRestaurantsRepository {
    async execute() {
        return await prisma.restaurant.findMany({
            select: {
                id: true,
                name: true,
                image_url: true,
            },
        })
    }
}
