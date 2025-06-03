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
})
