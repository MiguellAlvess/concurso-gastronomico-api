import { faker } from '@faker-js/faker'
import { GetRestaurantByIdUseCase } from './get-restaurant-by-id.js'
import { restaurant } from '../../tests/index.js'

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
})
