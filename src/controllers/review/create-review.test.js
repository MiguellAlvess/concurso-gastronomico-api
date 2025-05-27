import { CreateReviewController } from './create-review.js'
import { review } from '../../tests/index.js'
import { DishNotFoundError } from '../../errors/dish.js'
import { UserNotFoundError } from '../../errors/user.js'

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

    it('should return 404 when dish is not found', async () => {
        const { sut, createReviewUseCase } = makeSut()
        import.meta.jest
            .spyOn(createReviewUseCase, 'execute')
            .mockRejectedValue(new DishNotFoundError())

        const response = await sut.execute(httpRequest)

        expect(response.statusCode).toBe(404)
    })

    it('should return 404 when user is not found', async () => {
        const { sut, createReviewUseCase } = makeSut()
        import.meta.jest
            .spyOn(createReviewUseCase, 'execute')
            .mockRejectedValue(new UserNotFoundError())

        const response = await sut.execute(httpRequest)

        expect(response.statusCode).toBe(404)
    })

    it('should return 500 if CreateReviewUseCase throws', async () => {
        const { sut, createReviewUseCase } = makeSut()
        import.meta.jest
            .spyOn(createReviewUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(500)
    })
})
