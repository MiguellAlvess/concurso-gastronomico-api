import { prisma } from './prisma/prisma.js'

beforeEach(async () => {
    await prisma.review.deleteMany({})
    await prisma.dish.deleteMany({})
    await prisma.restaurant.deleteMany({})
    await prisma.user.deleteMany({})
})
