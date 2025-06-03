import { GetAllDishesUseCase } from './get-all-dishes.js'
import { dish } from '../../tests/index.js'

describe('Get All Dishes Use Case', () => {
    class GetAllDishesRepositoryStub {
        async execute() {
            return [dish]
        }
    }
    const makeSut = () => {
        const getAllDishesRepository = new GetAllDishesRepositoryStub()
        const sut = new GetAllDishesUseCase(getAllDishesRepository)

        return { sut, getAllDishesRepository }
    }

    it('should return all dishes successfully', async () => {
        const { sut } = makeSut()

        const allDishes = await sut.execute()

        expect(allDishes).toBeTruthy()
    })

    it('should throw if GetAllDishesRepository throws', async () => {
        const { sut, getAllDishesRepository } = makeSut()
        import.meta.jest
            .spyOn(getAllDishesRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute()

        await expect(promise).rejects.toThrow()
    })
})
