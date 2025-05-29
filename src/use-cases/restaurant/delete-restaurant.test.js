import { faker } from '@faker-js/faker'
import { DeleteRestaurantUseCase } from './delete-restaurant.js'
import { restaurant } from '../../tests/index.js'

describe('Delete Restaurant Use Case', () => {
    class DeleteRestaurantRepositoryStub {
        async execute() {
            return restaurant
        }
    }
    const makeSut = () => {
        const deleteRestaurantRepository = new DeleteRestaurantRepositoryStub()
        const sut = new DeleteRestaurantUseCase(deleteRestaurantRepository)

        return { sut, deleteRestaurantRepository }
    }

    it('should successfully delete a restaurant', async () => {
        const { sut } = makeSut()

        const deletedRestaurant = await sut.execute(faker.string.uuid())

        expect(deletedRestaurant).toEqual(restaurant)
    })

    it('should call DeleteRestaurantRepository with correct params', async () => {
        const { sut, deleteRestaurantRepository } = makeSut()
        const deleteRestaurantRepositorySpy = import.meta.jest.spyOn(
            deleteRestaurantRepository,
            'execute',
        )
        const restaurantId = faker.string.uuid()

        await sut.execute(restaurantId)

        expect(deleteRestaurantRepositorySpy).toHaveBeenCalledWith(restaurantId)
    })
})
