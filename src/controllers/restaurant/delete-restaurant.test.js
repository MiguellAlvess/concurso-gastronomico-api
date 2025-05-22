import { restaurant } from '../../tests/index.js'
import { RestaurantNotFoundError } from '../../errors/index.js'
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
        const { sut } = makeSut()

        const response = await sut.execute(httpRequest)

        expect(response.statusCode).toBe(200)
    })

    it('should return 400 when id provided is not valid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: {
                restaurantId: 'invalid-id',
            },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 404 when restaurant is not found', async () => {
        const { sut, deleteRestaurantUseCase } = makeSut()
        import.meta.jest
            .spyOn(deleteRestaurantUseCase, 'execute')
            .mockRejectedValueOnce(new RestaurantNotFoundError())

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(404)
    })

    it('shoul return 500 when DeleteRestaurantUseCase throws', async () => {
        const { sut, deleteRestaurantUseCase } = makeSut()
        import.meta.jest
            .spyOn(deleteRestaurantUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(500)
    })
})
