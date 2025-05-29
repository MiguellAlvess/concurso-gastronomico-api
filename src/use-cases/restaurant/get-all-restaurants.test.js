import { GetAllRestaurantsUseCase } from './get-all-restaurants.js'
import { restaurant } from '../../tests/index.js'

describe('Get All Restaurants Use Case', () => {
    class GetAllRestaurantsRepositoryStub {
        async execute() {
            return [restaurant]
        }
    }
    const makeSut = () => {
        const getAllRestaurantsRepository =
            new GetAllRestaurantsRepositoryStub()
        const sut = new GetAllRestaurantsUseCase(getAllRestaurantsRepository)

        return { sut, getAllRestaurantsRepository }
    }

    it('should return all restaurants successfully', async () => {
        const { sut } = makeSut()

        const allRestaurants = await sut.execute()

        expect(allRestaurants).toBeTruthy()
    })

    it('should throw if GetAllRestaurantsRepository throws', async () => {
        const { sut, getAllRestaurantsRepository } = makeSut()
        import.meta.jest
            .spyOn(getAllRestaurantsRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute()

        await expect(promise).rejects.toThrow()
    })
})
