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

    it('should call IdGeneratorAdapter to generate a random id', async () => {
        const { sut, idGeneratorAdapter, createReviewRepository } = makeSut()
        const idGeneratorAdapterSpy = import.meta.jest.spyOn(
            idGeneratorAdapter,
            'execute',
        )
        const createReviewRepositorySpy = import.meta.jest.spyOn(
            createReviewRepository,
            'execute',
        )

        await sut.execute(review)

        expect(idGeneratorAdapterSpy).toHaveBeenCalled()
        expect(createReviewRepositorySpy).toHaveBeenCalledWith({
            ...review,
            id: 'generated_id',
        })
    })
})
