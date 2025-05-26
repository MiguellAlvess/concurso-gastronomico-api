import { GetDishesByRestaurantIdController } from './get-dishes-by-restaurant-id.js'
import { faker } from '@faker-js/faker'
import { dish } from '../../tests/index.js'

describe('Get Dishes By Restaurant Id Controller', () => {
    class GetDishesByRestaurantIdUseCaseStub {
        async execute() {
            return dish
        }
    }

    const makeSut = () => {
        const getDishesByRestaurantIdUseCase =
            new GetDishesByRestaurantIdUseCaseStub()
        const sut = new GetDishesByRestaurantIdController(
            getDishesByRestaurantIdUseCase,
        )

        return { sut, getDishesByRestaurantIdUseCase }
    }

    it('should return 200 when getting all dishes of the restaurant successfully', async () => {
        const { sut } = makeSut()

        const response = await sut.execute({
            query: {
                restaurantId: faker.string.uuid(),
            },
        })

        expect(response.statusCode).toBe(200)
    })
})
