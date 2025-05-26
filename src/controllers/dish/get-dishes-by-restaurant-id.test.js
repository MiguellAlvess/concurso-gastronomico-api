import { GetDishesByRestaurantIdController } from './get-dishes-by-restaurant-id.js'
import { faker } from '@faker-js/faker'
import { dish } from '../../tests/index.js'
import { RestaurantNotFoundError } from '../../errors/index.js'

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

    it('should return 400 if restaurant id is not valid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            query: {
                restaurantId: 'invalid-id',
            },
        })
        expect(result.statusCode).toBe(400)
    })

    it('should return 404 if restaurant is not found', async () => {
        const { sut, getDishesByRestaurantIdUseCase } = makeSut()
        import.meta.jest
            .spyOn(getDishesByRestaurantIdUseCase, 'execute')
            .mockRejectedValueOnce(new RestaurantNotFoundError())

        const result = await sut.execute({
            query: {
                restaurantId: faker.string.uuid(),
            },
        })

        expect(result.statusCode).toBe(404)
    })

    it('should return 500 if GetDishesByRestaurantIdUseCase throws', async () => {
        const { sut, getDishesByRestaurantIdUseCase } = makeSut()
        import.meta.jest
            .spyOn(getDishesByRestaurantIdUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = await sut.execute({
            query: {
                restaurantId: faker.string.uuid(),
            },
        })

        expect(result.statusCode).toBe(500)
    })

    it('should call GetDishesByRestaurantIdUseCase with correct params', async () => {
        const { sut, getDishesByRestaurantIdUseCase } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            getDishesByRestaurantIdUseCase,
            'execute',
        )
        const restaurantId = faker.string.uuid()

        await sut.execute({
            query: {
                restaurantId,
            },
        })

        expect(executeSpy).toHaveBeenCalledWith(restaurantId)
    })
})
