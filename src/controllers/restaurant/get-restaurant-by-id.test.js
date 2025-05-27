import { GetRestaurantByIdController } from './get-restaurant-by-id.js'
import { restaurant } from '../../tests/index.js'
import { faker } from '@faker-js/faker'
import { RestaurantNotFoundError } from '../../errors/restaurant.js'

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

    it('should return 400 if restaurant id is not valid', async () => {
        const { sut } = makeSut()

        const response = await sut.execute({
            params: {
                restaurantId: 'invalid-id',
            },
        })

        expect(response.statusCode).toBe(400)
    })

    it('shoud return 404 if restaurant is not found', async () => {
        const { sut, getRestaurantByIdUseCase } = makeSut()
        import.meta.jest
            .spyOn(getRestaurantByIdUseCase, 'execute')
            .mockRejectedValueOnce(new RestaurantNotFoundError())

        const response = await sut.execute({
            params: {
                restaurantId: faker.string.uuid(),
            },
        })

        expect(response.statusCode).toBe(404)
    })

    it('should return 500 if GetRestaurantByIdUseCase throws', async () => {
        const { sut, getRestaurantByIdUseCase } = makeSut()
        import.meta.jest
            .spyOn(getRestaurantByIdUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        const response = await sut.execute({
            params: {
                restaurantId: faker.string.uuid(),
            },
        })

        expect(response.statusCode).toBe(500)
    })
})
