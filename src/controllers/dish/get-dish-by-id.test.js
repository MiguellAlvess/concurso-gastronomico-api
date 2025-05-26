import { faker } from '@faker-js/faker'
import { GetDishByIdController } from './get-dish-by-id.js'
import { dish } from '../../tests/index.js'

describe('Get Dish By Id Controller', () => {
    class GetDishByIdUseCaseStub {
        async execute() {
            return dish
        }
    }

    const makeSut = () => {
        const getDishByIdUseCase = new GetDishByIdUseCaseStub()
        const sut = new GetDishByIdController(getDishByIdUseCase)

        return { sut, getDishByIdUseCase }
    }

    it('should return 200 when getting a dish successfully', async () => {
        const { sut } = makeSut()

        const response = await sut.execute({
            params: {
                dishId: faker.string.uuid(),
            },
        })

        expect(response.statusCode).toBe(200)
    })

    it('should return 400 when dish id is not valid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: {
                dishId: 'invalid-id',
            },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 500 if GetDishByIdUseCase throws', async () => {
        const { sut, getDishByIdUseCase } = makeSut()
        import.meta.jest
            .spyOn(getDishByIdUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = await sut.execute({
            params: {
                dishId: faker.string.uuid(),
            },
        })

        expect(result.statusCode).toBe(500)
    })
})
