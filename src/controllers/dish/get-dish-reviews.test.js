import { GetDishReviewsController } from './get-dish-reviews.js'
import { review } from '../../tests/index.js'
import { faker } from '@faker-js/faker'

describe('Get Dish Reviews Controller', () => {
    class GetDishReviewsUseCaseStub {
        async execute() {
            return review
        }
    }

    const makeSut = () => {
        const getDishReviewsUseCase = new GetDishReviewsUseCaseStub()
        const sut = new GetDishReviewsController(getDishReviewsUseCase)

        return { sut, getDishReviewsUseCase }
    }

    it('should return 200 when getting a dish reviews successfully', async () => {
        const { sut } = makeSut()

        const response = await sut.execute({
            query: {
                dishId: faker.string.uuid(),
            },
        })

        expect(response.statusCode).toBe(200)
    })

    it('should return 400 when dish id is not valid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            query: {
                dishId: 'invalid-id',
            },
        })

        expect(result.statusCode).toBe(400)
    })
})
