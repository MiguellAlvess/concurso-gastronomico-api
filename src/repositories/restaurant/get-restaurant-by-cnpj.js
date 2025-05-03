import { prisma } from '../../../prisma/prisma.js'

export class PostgresGetRestaurantByCnpjRepository {
    async execute(cnpj) {
        return await prisma.restaurant.findUnique({
            where: {
                cnpj,
            },
        })
    }
}
