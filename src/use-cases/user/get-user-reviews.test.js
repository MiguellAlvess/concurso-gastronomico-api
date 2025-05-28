import { GetUserReviewsUseCase } from './get-user-reviews.js'
import { review, user } from '../../tests/index.js'
import { faker } from '@faker-js/faker'

describe('Get User Reviews Use Case', () => {
    class GetUserReviewsRepositoryStub {
        async execute() {
            return review
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user
        }
    }
    const makeSut = () => {
        const getUserReviewsRepository = new GetUserReviewsRepositoryStub()
        const getUserByIdRepository = new GetUserByIdRepositoryStub()
        const sut = new GetUserReviewsUseCase(
            getUserReviewsRepository,
            getUserByIdRepository,
        )

        return { sut, getUserReviewsRepository, getUserByIdRepository }
    }

    it('should get user reviews successfully', async () => {
        const { sut } = makeSut()

        const getUserReviews = await sut.execute(faker.string.uuid())

        expect(getUserReviews).toEqual(review)
    })

    it('should call GetUserReviewsRepository with correct params', async () => {
        const { sut, getUserReviewsRepository } = makeSut()
        const getUserReviewsRepositorySpy = import.meta.jest.spyOn(
            getUserReviewsRepository,
            'execute',
        )
        const userId = faker.string.uuid()

        await sut.execute(userId)

        expect(getUserReviewsRepositorySpy).toHaveBeenCalledWith(userId)
    })

    it('should call GetUserByIdRepository with correct params', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        const getUserByIdRepositorySpy = import.meta.jest.spyOn(
            getUserByIdRepository,
            'execute',
        )
        const userId = faker.string.uuid()

        await sut.execute(userId)

        expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(userId)
    })
})
