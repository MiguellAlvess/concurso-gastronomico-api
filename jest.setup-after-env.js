import { prisma } from './prisma/prisma.js'

beforeEach(async () => {
    await prisma.user.deleteMany({})
    await prisma.restaurant.deleteMany({})
    await prisma.dish.deleteMany({})
    await prisma.review.deleteMany({})
})
