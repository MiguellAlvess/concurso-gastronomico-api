import { faker } from '@faker-js/faker'
import { GetDishesByRestaurantIdUseCase } from './get-dishes-by-restaurant-id.js'
import { dish } from '../../tests/index.js'

describe('Get Dishes By Restaurant Id Use Case', () => {
    class GetDishesByRestaurantIdRepositoryStub {
        async execute() {
            return dish
        }
    }

    class GetRestaurantByIdRepositoryStub {
        async execute() {
            return true
        }
    }
    const makeSut = () => {
        const getDishesByRestaurantIdRepository =
            new GetDishesByRestaurantIdRepositoryStub()

        const getRestaurantByIdRepository =
            new GetRestaurantByIdRepositoryStub()

        const sut = new GetDishesByRestaurantIdUseCase(
            getDishesByRestaurantIdRepository,
            getRestaurantByIdRepository,
        )

        return {
            sut,
            getDishesByRestaurantIdRepository,
            getRestaurantByIdRepository,
        }
    }

    it('should get dishes by restaurant id successfully', async () => {
        const { sut } = makeSut()

        const getDishes = await sut.execute(faker.string.uuid())

        expect(getDishes).toBeTruthy()
    })

    it('should call GetDishesByRestaurantIdRepository with correct params', async () => {
        const { sut, getDishesByRestaurantIdRepository } = makeSut()
        const getDishesByRestaurantIdRepositorySpy = import.meta.jest.spyOn(
            getDishesByRestaurantIdRepository,
            'execute',
        )
        const restaurantId = faker.string.uuid()

        await sut.execute(restaurantId)

        expect(getDishesByRestaurantIdRepositorySpy).toHaveBeenCalledWith(
            restaurantId,
        )
    })

    it('should throw if GetDishesByRestaurantIdRepository throws', async () => {
        const { sut, getDishesByRestaurantIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getDishesByRestaurantIdRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(faker.string.uuid())

        await expect(promise).rejects.toThrow()
    })

    it('should throw if GetRestaurantByIdRepository throws', async () => {
        const { sut, getRestaurantByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getRestaurantByIdRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(faker.string.uuid())

        await expect(promise).rejects.toThrow()
    })
})
