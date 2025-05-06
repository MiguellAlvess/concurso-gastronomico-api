import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetDishByIdRepository {
    async execute(dishId) {
        return await prisma.dish.findUnique({
            where: {
                id: dishId,
            },
        })
    }
}
