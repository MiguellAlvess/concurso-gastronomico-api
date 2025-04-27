import { prisma } from '../../../prisma/prisma.js'
export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        return await prisma.user.create({
            data: createUserParams,
        })
    }
}
