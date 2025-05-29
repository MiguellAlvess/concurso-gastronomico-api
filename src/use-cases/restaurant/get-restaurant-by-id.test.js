import { faker } from '@faker-js/faker'
import { GetRestaurantByIdUseCase } from './get-restaurant-by-id.js'
import { restaurant } from '../../tests/index.js'
import { RestaurantNotFoundError } from '../../errors/restaurant.js'

describe('Get Restaurant By Id Use Case', () => {
    class GetRestaurantByIdRepositoryStub {
        async execute() {
            return restaurant
        }
    }
    const makeSut = () => {
        const getRestaurantByIdRepository =
            new GetRestaurantByIdRepositoryStub()
        const sut = new GetRestaurantByIdUseCase(getRestaurantByIdRepository)

        return { sut, getRestaurantByIdRepository }
    }

    it('should get restaurant by id successfully', async () => {
        const { sut } = makeSut()

        const getRestaurant = await sut.execute(faker.string.uuid())

        expect(getRestaurant).toEqual(restaurant)
    })

    it('should call GetRestaurantByIdRepository with correct params', async () => {
        const { sut, getRestaurantByIdRepository } = makeSut()
        const getRestaurantByIdRepositorySpy = import.meta.jest.spyOn(
            getRestaurantByIdRepository,
            'execute',
        )
        const restaurantId = faker.string.uuid()

        await sut.execute(restaurantId)

        expect(getRestaurantByIdRepositorySpy).toHaveBeenCalledWith(
            restaurantId,
        )
    })

    it('should throw if GetRestaurantByIdRepository throws', async () => {
        const { sut, getRestaurantByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getRestaurantByIdRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(faker.string.uuid())

        await expect(promise).rejects.toThrow()
    })

    it('should throw an RestaurantNotFoundError if GetRestaurantByIdRepository returns null', async () => {
        const { sut, getRestaurantByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getRestaurantByIdRepository, 'execute')
            .mockResolvedValueOnce(null)
        const restaurantId = faker.string.uuid()

        const promise = sut.execute(restaurantId)

        await expect(promise).rejects.toThrow(
            new RestaurantNotFoundError(restaurantId),
        )
    })
})
