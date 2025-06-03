import { GetDishByIdUseCase } from './get-dish-by-id.js'
import { dish } from '../../tests/index.js'

describe('Get Dish By Id Use Case', () => {
    class GetDishByIdRepository {
        async execute() {
            return dish
        }
    }
    const makeSut = () => {
        const getDishByIdRepository = new GetDishByIdRepository()
        const sut = new GetDishByIdUseCase(getDishByIdRepository)

        return { sut, getDishByIdRepository }
    }

    it('should get dish by id successfully', async () => {
        const { sut } = makeSut()

        const getDish = await sut.execute(dish.id)

        expect(getDish).toEqual(dish)
    })

    it('should call GetDishByIdRepository with correct params', async () => {
        const { sut, getDishByIdRepository } = makeSut()
        const getDishByIdRepositorySpy = import.meta.jest.spyOn(
            getDishByIdRepository,
            'execute',
        )

        await sut.execute(dish.id)

        expect(getDishByIdRepositorySpy).toHaveBeenCalledWith(dish.id)
    })
})
