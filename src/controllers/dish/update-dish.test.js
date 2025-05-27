import { UpdateDishController } from './update-dish.js'
import { dish } from '../../tests/index.js'
import { faker } from '@faker-js/faker'

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

        const result = await sut.execute({
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

        expect(result.statusCode).toBe(400)
    })
})
