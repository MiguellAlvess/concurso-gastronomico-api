import { UpdateRestaurantController } from './update-restaurant.js'
import { restaurant } from '../../tests/index.js'
import { RestaurantNotFoundError } from '../../errors/index.js'

describe('Update Restaurant Controller', () => {
    class UpdateRestaurantUseCaseStub {
        async execute() {
            return restaurant
        }
    }

    const makeSut = () => {
        const updateRestaurantUseCase = new UpdateRestaurantUseCaseStub()
        const sut = new UpdateRestaurantController(updateRestaurantUseCase)

        return { sut, updateRestaurantUseCase }
    }
    const httpRequest = {
        params: {
            restaurantId: restaurant.id,
        },
        body: {
            name: restaurant.name,
            cnpj: restaurant.cnpj,
            password: restaurant.password,
        },
        file: restaurant.file,
    }

    it('should return 200 when updating a restaurant successfully', async () => {
        const { sut } = makeSut()

        const response = await sut.execute(httpRequest)

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

    it('should return 404 if restaurant is not found', async () => {
        const { sut, updateRestaurantUseCase } = makeSut()
        import.meta.jest
            .spyOn(updateRestaurantUseCase, 'execute')
            .mockRejectedValueOnce(new RestaurantNotFoundError())

        const response = await sut.execute(httpRequest)

        expect(response.statusCode).toBe(404)
    })
})
