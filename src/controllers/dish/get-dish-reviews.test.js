import { GetDishReviewsController } from './get-dish-reviews.js'
import { review } from '../../tests/index.js'
import { faker } from '@faker-js/faker'
import { DishNotFoundError } from '../../errors/dish.js'

describe('Get Dish Reviews Controller', () => {
    class GetDishReviewsUseCaseStub {
        async execute() {
            return { reviews: [review], averageRating: 4.5 }
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

    it('should return 404 when dish is not found', async () => {
        const { sut, getDishReviewsUseCase } = makeSut()
        import.meta.jest
            .spyOn(getDishReviewsUseCase, 'execute')
            .mockRejectedValueOnce(new DishNotFoundError())

        const result = await sut.execute({
            query: {
                dishId: faker.string.uuid(),
            },
        })

        expect(result.statusCode).toBe(404)
    })

    it('should return 500 when GetDishReviewsUseCase throws', async () => {
        const { sut, getDishReviewsUseCase } = makeSut()
        import.meta.jest
            .spyOn(getDishReviewsUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = await sut.execute({
            query: {
                dishId: faker.string.uuid(),
            },
        })

        expect(result.statusCode).toBe(500)
    })

    it('should call GetDishReviewsUseCase with correct params', async () => {
        const { sut, getDishReviewsUseCase } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            getDishReviewsUseCase,
            'execute',
        )
        const dishId = faker.string.uuid()

        await sut.execute({
            query: {
                dishId,
            },
        })

        expect(executeSpy).toHaveBeenCalledWith(dishId)
    })
})
