import { faker } from '@faker-js/faker'
import { UpdateDishController } from './update-dish.js'
import { dish } from '../../tests/index.js'
import { DishNotFoundError } from '../../errors/dish.js'

describe('Update Dish Controller', () => {
    class UpdateDishUseCaseStub {
        async execute() {
            return dish
        }
    }
    const makeSut = () => {
        const updateDishUseCase = new UpdateDishUseCaseStub()
        const sut = new UpdateDishController(updateDishUseCase)

        return { sut, updateDishUseCase }
    }

    const httpRequest = {
        params: {
            dishId: faker.string.uuid(),
        },
        body: {
            name: dish.name,
            image_url: dish.image_url,
            restaurant_id: dish.restaurant_id,
        },
        file: dish.file,
    }

    it('should return 200 when updating a dish successfully', async () => {
        const { sut } = makeSut()

        const response = await sut.execute(httpRequest)

        expect(response.statusCode).toBe(200)
    })

    it('should return 400 if dish id is not valid', async () => {
        const { sut } = makeSut()

        const response = await sut.execute({
            params: {
                dishId: 'invalid-id',
            },
            body: {
                name: dish.name,
                image_url: dish.image_url,
                restaurant_id: dish.restaurant_id,
            },
            file: dish.file,
        })

        expect(response.statusCode).toBe(400)
    })

    it('should return 404 if dish is not found', async () => {
        const { sut, updateDishUseCase } = makeSut()
        import.meta.jest
            .spyOn(updateDishUseCase, 'execute')
            .mockRejectedValueOnce(new DishNotFoundError())

        const response = await sut.execute(httpRequest)

        expect(response.statusCode).toBe(404)
    })

    it('should return 500 if UpdateDishUseCase throws', async () => {
        const { sut, updateDishUseCase } = makeSut()
        import.meta.jest
            .spyOn(updateDishUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        const response = await sut.execute(httpRequest)

        expect(response.statusCode).toBe(500)
    })

    it('should call UpdateDishUseCase with correct params', async () => {
        const { sut, updateDishUseCase } = makeSut()
        const executeSpy = import.meta.jest.spyOn(updateDishUseCase, 'execute')
        const dishId = faker.string.uuid()

        await sut.execute({
            params: { dishId },
            body: {
                name: dish.name,
                image_url: dish.image_url,
                restaurant_id: dish.restaurant_id,
            },
            file: dish.file,
        })

        expect(executeSpy).toHaveBeenCalledWith(dishId, {
            name: dish.name,
            image_url: dish.image_url,
            restaurant_id: dish.restaurant_id,
            imageFilename: dish.file.filename,
        })
    })
})
