import { faker } from '@faker-js/faker'
import { dish } from '../../tests/index.js'
import { DeleteDishController } from './delete-dish.js'
import { DishNotFoundError } from '../../errors/dish.js'

describe('Delete Dish Controller', () => {
    class DeleteDishUseCaseStub {
        async execute() {
            return dish
        }
    }
    const makeSut = () => {
        const deleteDishUseCase = new DeleteDishUseCaseStub()
        const sut = new DeleteDishController(deleteDishUseCase)

        return { sut, deleteDishUseCase }
    }

    it('should return 200 when deleting a dish successfully', async () => {
        const { sut } = makeSut()

        const response = await sut.execute({
            params: {
                dishId: faker.string.uuid(),
            },
            restaurantId: faker.string.uuid(),
        })

        expect(response.statusCode).toBe(200)
    })

    it('should return 400 if dish id is not valid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: {
                dishId: 'invalid-id',
            },
            restaurantId: faker.string.uuid(),
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if restaurnt id is not valid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: {
                dishId: faker.string.uuid(),
            },
            restaurantId: 'invalid-id',
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 404 if dish is not found', async () => {
        const { sut, deleteDishUseCase } = makeSut()
        import.meta.jest
            .spyOn(deleteDishUseCase, 'execute')
            .mockRejectedValueOnce(new DishNotFoundError())

        const result = await sut.execute({
            params: {
                dishId: faker.string.uuid(),
            },
            restaurantId: faker.string.uuid(),
        })

        expect(result.statusCode).toBe(404)
    })

    it('should return 500 if DeleteDishUseCase throws', async () => {
        const { sut, deleteDishUseCase } = makeSut()
        import.meta.jest
            .spyOn(deleteDishUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = await sut.execute({
            params: {
                dishId: faker.string.uuid(),
            },
            restaurantId: faker.string.uuid(),
        })

        expect(result.statusCode).toBe(500)
    })

    it('should call DeleteDishUseCase with correct params', async () => {
        const { sut, deleteDishUseCase } = makeSut()
        const executeSpy = import.meta.jest.spyOn(deleteDishUseCase, 'execute')
        const dishId = faker.string.uuid()
        const restaurantId = faker.string.uuid()

        await sut.execute({
            params: {
                dishId,
            },
            restaurantId,
        })

        expect(executeSpy).toHaveBeenCalledWith(dishId, restaurantId)
    })
})
