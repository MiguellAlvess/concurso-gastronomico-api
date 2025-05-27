import { GetUserReviewsController } from './get-user-reviews'
import { review } from '../../tests/index'
import { faker } from '@faker-js/faker'

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
})
