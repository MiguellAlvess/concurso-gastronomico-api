import { GetAllRestaurantsController } from './get-all-restaurants.js'
import { restaurant } from '../../tests/index.js'

describe('Get All Restaurants Controller', () => {
    class GetAllRestaurantsUseCaseStub {
        async execute() {
            return restaurant
        }
    }
    const makeSut = () => {
        const getAllRestaurantsUseCase = new GetAllRestaurantsUseCaseStub()
        const sut = new GetAllRestaurantsController(getAllRestaurantsUseCase)

        return { sut, getAllRestaurantsUseCase }
    }

    it('should return 200 when getting all restaurants successfully', async () => {
        const { sut } = makeSut()

        const response = await sut.execute()

        expect(response.statusCode).toBe(200)
    })
})
