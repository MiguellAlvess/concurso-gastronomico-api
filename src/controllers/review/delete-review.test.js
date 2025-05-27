import { DeleteReviewController } from './delete-review.js'
import { review } from '../../tests/index.js'
import { faker } from '@faker-js/faker'
import { ReviewNotFoundError } from '../../errors/index.js'

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

        const response = await sut.execute({
            params: {
                reviewId: 'invalid-id',
            },
        })

        expect(response.statusCode).toBe(400)
    })

    it('should return 404 if review is not found', async () => {
        const { sut, deleteReviewUseCase } = makeSut()
        import.meta.jest
            .spyOn(deleteReviewUseCase, 'execute')
            .mockRejectedValueOnce(new ReviewNotFoundError())

        const response = await sut.execute({
            params: {
                reviewId: faker.string.uuid(),
            },
        })

        expect(response.statusCode).toBe(404)
    })
})
