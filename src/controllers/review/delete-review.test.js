import { DeleteReviewController } from './delete-review.js'
import { review } from '../../tests/index.js'
import { faker } from '@faker-js/faker'

describe('Delete Review Controller', () => {
    class DeleteReviewUseCaseStub {
        async execute() {
            return review
        }
    }

    const makeSut = () => {
        const deleteReviewUseCase = new DeleteReviewUseCaseStub()
        const sut = new DeleteReviewController(deleteReviewUseCase)

        return { sut, deleteReviewUseCase }
    }

    it('should return 200 when deleting a review successfully', async () => {
        const { sut } = makeSut()

        const response = await sut.execute({
            params: {
                reviewId: faker.string.uuid(),
            },
        })

        expect(response.statusCode).toBe(200)
    })

    it('should return 400 if review id is not valid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: {
                reviewId: 'invalid-id',
            },
        })

        expect(result.statusCode).toBe(400)
    })
})
