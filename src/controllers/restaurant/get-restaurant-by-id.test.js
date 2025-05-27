import { GetRestaurantByIdController } from './get-restaurant-by-id.js'
import { restaurant } from '../../tests/index.js'
import { faker } from '@faker-js/faker'

describe('Get Restaurant By Id Controller', () => {
    class GetRestaurantByIdUseCaseStub {
        async execute() {
            return restaurant
        }
    }

    const makeSut = () => {
        const getRestaurantByIdUseCase = new GetRestaurantByIdUseCaseStub()
        const sut = new GetRestaurantByIdController(getRestaurantByIdUseCase)

        return { sut, getRestaurantByIdUseCase }
    }

    it('should return 200 when getting a restaurant successfully', async () => {
        const { sut } = makeSut()

        const response = await sut.execute({
            params: {
                restaurantId: faker.string.uuid(),
            },
        })

        expect(response.statusCode).toBe(200)
    })
})
