import { restaurant } from '../../tests/index.js'
import { CreateRestaurantController } from './create-restaurant'

describe('Create Restaurant Controller', () => {
    class CreateRestaurantUseCaseStub {
        async execute() {
            return restaurant
        }
    }

    const makeSut = () => {
        const createRestaurantUseCase = new CreateRestaurantUseCaseStub()
        const sut = new CreateRestaurantController(createRestaurantUseCase)

        return { sut, createRestaurantUseCase }
    }
    const httpRequest = {
        body: {
            ...restaurant,
            id: undefined,
        },
    }

    it('should return 201 when creating a restaurant successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute(httpRequest)

        // assert
        expect(response.statusCode).toBe(201)
    })
})
