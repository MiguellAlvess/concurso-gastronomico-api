import { prisma } from '../../../prisma/prisma.js'

export class PostgresUpdateDishRepository {
    async execute(dishId, updateDishParams) {
        return await prisma.dish.update({
            where: {
                id: dishId,
            },
            data: updateDishParams,
        })
    }
}
