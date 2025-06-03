import { GetDishReviewsUseCase } from './get-dish-reviews'
import { dish } from '../../tests/index.js'

describe('Get Dish Reviews Use Case', () => {
    class GetDishReviewsRepository {
        async execute() {
            return dish
        }
    }
    class GetDishByIdRepository {
        async execute() {
            return dish
        }
    }

    const makeSut = () => {
        const getDishReviewsRepository = new GetDishReviewsRepository()
        const getDishByIdRepository = new GetDishByIdRepository()
        const sut = new GetDishReviewsUseCase(
            getDishReviewsRepository,
            getDishByIdRepository,
        )

        return { sut, getDishReviewsRepository, getDishByIdRepository }
    }

    it('should get dish reviews successfully', async () => {
        const { sut } = makeSut()

        const getDishReviews = await sut.execute(dish.id)

        expect(getDishReviews).toBeTruthy()
    })

    it('should call GetDishReviewsRepository with correct params', async () => {
        const { sut, getDishReviewsRepository } = makeSut()
        const getDishReviewsRepositorySpy = import.meta.jest.spyOn(
            getDishReviewsRepository,
            'execute',
        )

        await sut.execute(dish.id)

        expect(getDishReviewsRepositorySpy).toHaveBeenCalledWith(dish.id)
    })

    it('should throw if GetDishReviewsRepository throws', async () => {
        const { sut, getDishReviewsRepository } = makeSut()
        import.meta.jest
            .spyOn(getDishReviewsRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(dish.id)

        await expect(promise).rejects.toThrow()
    })

    it('should throw if GetDishByIdRepository throws', async () => {
        const { sut, getDishByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getDishByIdRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(dish.id)

        await expect(promise).rejects.toThrow()
    })
})
