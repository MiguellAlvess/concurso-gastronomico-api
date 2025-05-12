import { prisma } from '../../../prisma/prisma.js'
import { DishNotFoundError } from '../../errors/dish.js'

export class PostgresUpdateDishRepository {
    async execute(dishId, updateDishParams) {
        try {
            return await prisma.dish.update({
                where: {
                    id: dishId,
                },
                data: updateDishParams,
            })
        } catch (error) {
            if (error.name === 'PrismaClientKnownRequestError') {
                // P2025 -> An operation failed because it depends on one or more records that were required but not found. {cause}
                if (error.code === 'P2025') {
                    throw new DishNotFoundError(dishId)
                }
            }

            throw error
        }
    }
}
