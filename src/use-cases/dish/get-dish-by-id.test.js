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
})
