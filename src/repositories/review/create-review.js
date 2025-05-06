import { prisma } from '../../../prisma/prisma.js'

export class PostgresCreateReviewRepository {
    async execute(createReviewParams) {
        return await prisma.review.create({
            data: createReviewParams,
        })
    }
}
