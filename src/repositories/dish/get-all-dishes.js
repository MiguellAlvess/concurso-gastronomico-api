import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetAllDishesRepository {
    async execute() {
        return await prisma.dish.findMany({
            include: {
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        image_url: true,
                    },
                },
                reviews: {
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        user: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                            },
                        },
                    },
                },
            },
        })
    }
}
