import { user } from '../../tests/index.js'
import { PostgresGetUserReviewsRepository } from './get-user-reviews.js'
import { prisma } from '../../../prisma/prisma.js'

describe('Get User Reviews Repository', () => {
    it('should get user reviews on db', async () => {
        await prisma.user.create({
            data: user,
        })
        const sut = new PostgresGetUserReviewsRepository()

        const result = await sut.execute(user.id)

        expect(result).toStrictEqual([])
    })

    it('should call Prisma with correct params', async () => {
        await prisma.user.create({
            data: user,
        })
        const sut = new PostgresGetUserReviewsRepository()
        const prismaSpy = import.meta.jest.spyOn(prisma.review, 'findMany')

        await sut.execute(user.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: user.id,
            },
        })
    })

    it('should throw if Prisma throws', async () => {
        const sut = new PostgresGetUserReviewsRepository()
        import.meta.jest
            .spyOn(prisma.review, 'findMany')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(user.id)

        await expect(promise).rejects.toThrow()
    })
})
