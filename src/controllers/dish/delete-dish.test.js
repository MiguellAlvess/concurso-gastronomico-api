import { faker } from '@faker-js/faker'
import { dish } from '../../tests/index.js'
import { DeleteDishController } from './delete-dish.js'

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
})
