import { restaurant } from '../../tests/index.js'
import { DeleteRestaurantController } from './delete-restaurant.js'
import { faker } from '@faker-js/faker'

describe('Delete Restaurant Controller', () => {
    class DeleteRestaurantUseCaseStub {
        async execute() {
            return restaurant
        }
    }

    const makeSut = () => {
        const deleteRestaurantUseCase = new DeleteRestaurantUseCaseStub()
        const sut = new DeleteRestaurantController(deleteRestaurantUseCase)

        return { sut, deleteRestaurantUseCase }
    }

    const httpRequest = {
        params: {
            restaurantId: faker.string.uuid(),
        },
    }

    it('should return 200 when deleting a restaurant successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute(httpRequest)

        // assert
        expect(response.statusCode).toBe(200)
    })
})
