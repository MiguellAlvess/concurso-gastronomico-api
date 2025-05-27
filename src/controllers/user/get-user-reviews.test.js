import { faker } from '@faker-js/faker'
import { UserNotFoundError } from '../../errors/index.js'
import { GetUserReviewsController } from './get-user-reviews'
import { review } from '../../tests/index'

describe('Get User Reviews Controller', () => {
    class GetUserReviewsUseCaseStub {
        async execute() {
            return review
        }
    }

    const makeSut = () => {
        const getUserReviewsUseCase = new GetUserReviewsUseCaseStub()
        const sut = new GetUserReviewsController(getUserReviewsUseCase)

        return { sut, getUserReviewsUseCase }
    }

    it('should return 200 when getting user reviews successfully', async () => {
        const { sut } = makeSut()

        const response = await sut.execute({
            query: {
                userId: faker.string.uuid(),
            },
        })

        expect(response.statusCode).toBe(200)
    })

    it('should return 400 when user id is invalid', async () => {
        const { sut } = makeSut()

        const response = await sut.execute({
            query: {
                userId: 'invalid_id',
            },
        })

        expect(response.statusCode).toBe(400)
    })

    it('should return 404 if user is not found', async () => {
        const { sut, getUserReviewsUseCase } = makeSut()
        import.meta.jest
            .spyOn(getUserReviewsUseCase, 'execute')
            .mockRejectedValueOnce(new UserNotFoundError())

        const response = await sut.execute({
            query: {
                userId: faker.string.uuid(),
            },
        })

        expect(response.statusCode).toBe(404)
    })

    it('should return 500 when GetUserReviewsUseCase throws', async () => {
        const { sut, getUserReviewsUseCase } = makeSut()
        import.meta.jest
            .spyOn(getUserReviewsUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        const response = await sut.execute({
            query: {
                userId: faker.string.uuid(),
            },
        })

        expect(response.statusCode).toBe(500)
    })
})
