import { GetAllDishesController } from './get-all-dishes.js'
import { dish } from '../../tests/index.js'

describe('Get All Dishes Controller', () => {
    class GetAllDishesUseCaseStub {
        async execute() {
            return dish
        }
    }
    const makeSut = () => {
        const getAllDishesUseCase = new GetAllDishesUseCaseStub()
        const sut = new GetAllDishesController(getAllDishesUseCase)

        return { sut, getAllDishesUseCase }
    }

    it('should return 200 when getting all dishes successfully', async () => {
        const { sut } = makeSut()

        const response = await sut.execute()

        expect(response.statusCode).toBe(200)
    })
})
