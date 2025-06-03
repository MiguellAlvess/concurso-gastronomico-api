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
})
