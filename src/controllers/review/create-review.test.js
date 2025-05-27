import { CreateReviewController } from './create-review.js'
import { review } from '../../tests/index.js'

describe('Create Review Controller', () => {
    class CreateReviewUseCaseStub {
        async execute() {
            return review
        }
    }

    const makeSut = () => {
        const createReviewUseCase = new CreateReviewUseCaseStub()
        const sut = new CreateReviewController(createReviewUseCase)

        return {
            sut,
            createReviewUseCase,
        }
    }

    const httpRequest = {
        params: {
            dishId: review.dish_id,
        },
        body: {
            ...review,
            id: undefined,
        },
        userId: review.user_id,
    }

    it('should return 201 when creating a review successfully', async () => {
        const { sut } = makeSut()

        const response = await sut.execute(httpRequest)

        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual(review)
    })

    it('should return 400 when rating is not provided', async () => {
        const { sut } = makeSut()

        const response = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                rating: undefined,
            },
        })

        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when comment is not provided', async () => {
        const { sut } = makeSut()

        const response = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                comment: undefined,
            },
        })

        expect(response.statusCode).toBe(400)
    })
})
