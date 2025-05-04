import { prisma } from '../../../prisma/prisma.js'

export class PostgresCreateDishRepository {
    async execute(createDishParams) {
        return await prisma.dish.create({
            data: createDishParams,
        })
    }
}
