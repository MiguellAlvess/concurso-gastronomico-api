import { prisma } from '../../../prisma/prisma.js'
import { UserNotFoundError } from '../../errors/user.js'

export class PostgresDeleteUserRepository {
    async execute(userId) {
        try {
            return await prisma.user.delete({
                where: {
                    id: userId,
                },
            })
        } catch (error) {
            if (error.name === 'PrismaClientKnownRequestError') {
                // P2025 -> An operation failed because it depends on one or more records that were required but not found. {cause}
                if (error.code === 'P2025') {
                    throw new UserNotFoundError(userId)
                }
            }

            throw error
        }
    }
}
