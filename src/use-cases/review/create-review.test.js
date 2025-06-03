import { CreateReviewUseCase } from './create-review.js'
import { review } from '../../tests/index.js'

describe('Create Review Use Case', () => {
    class CreateReviewRepositoryStub {
        async execute() {
            return review
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return true
        }
    }

    class GetDishByIdRepositoryStub {
        async execute() {
            return true
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'generated_id'
        }
    }

    class CheckUserReviewRepositoryStub {
        async execute() {
            return false
        }
    }

    const makeSut = () => {
        const createReviewRepository = new CreateReviewRepositoryStub()
        const getUserByIdRepository = new GetUserByIdRepositoryStub()
        const getDishByIdRepository = new GetDishByIdRepositoryStub()
        const idGeneratorAdapter = new IdGeneratorAdapterStub()
        const checkUserReviewRepository = new CheckUserReviewRepositoryStub()
        const sut = new CreateReviewUseCase(
            createReviewRepository,
            getUserByIdRepository,
            getDishByIdRepository,
            idGeneratorAdapter,
            checkUserReviewRepository,
        )

        return {
            sut,
            createReviewRepository,
            getUserByIdRepository,
            getDishByIdRepository,
            idGeneratorAdapter,
            checkUserReviewRepository,
        }
    }

    it('should successfully create a review', async () => {
        const { sut } = makeSut()

        const createdReview = await sut.execute(review)

        expect(createdReview).toBeTruthy()
    })
})
