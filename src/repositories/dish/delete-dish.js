import { prisma } from '../../../prisma/prisma.js'

export class PostgresDeleteDishRepository {
    async execute(dishId) {
        try {
            return await prisma.dish.delete({
                where: {
                    id: dishId,
                },
            })
        } catch (error) {
            return null
        }
    }
}
