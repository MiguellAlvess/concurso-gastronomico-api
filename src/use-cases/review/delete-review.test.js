import { DeleteReviewUseCase } from './delete-review.js'
import { review } from '../../tests/index.js'

describe('Delete Review Use Case', () => {
    class DeleteReviewRepositoryStub {
        async execute() {
            return review
        }
    }

    class GetReviewByIdRepositoryStub {
        async execute() {
            return review
        }
    }
    const makeSut = () => {
        const deleteReviewRepository = new DeleteReviewRepositoryStub()
        const getReviewByIdRepository = new GetReviewByIdRepositoryStub()
        const sut = new DeleteReviewUseCase(
            deleteReviewRepository,
            getReviewByIdRepository,
        )

        return {
            sut,
            deleteReviewRepository,
            getReviewByIdRepository,
        }
    }

    it('should delete a review successfully', async () => {
        const { sut } = makeSut()

        const response = await sut.execute(review.id, review.user_id)

        expect(response).toBeTruthy()
    })

    it('should call DeleteReviewRepository with correct params', async () => {
        const { sut, deleteReviewRepository } = makeSut()
        const deleteReviewRepositorySpy = import.meta.jest.spyOn(
            deleteReviewRepository,
            'execute',
        )

        await sut.execute(review.id, review.user_id)

        expect(deleteReviewRepositorySpy).toHaveBeenCalledWith(review.id)
    })

    it('should throw if GetReviewByIdRepository throws', async () => {
        const { sut, getReviewByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getReviewByIdRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(review.id, review.user_id)

        await expect(promise).rejects.toThrow()
    })

    it('should throw if DeleteReviewRepository throws', async () => {
        const { sut, deleteReviewRepository } = makeSut()
        import.meta.jest
            .spyOn(deleteReviewRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(review.id, review.user_id)

        await expect(promise).rejects.toThrow()
    })
})
