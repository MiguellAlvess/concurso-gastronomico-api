import { UpdateDishUseCase } from './update-dish.js'
import { dish } from '../../tests/index.js'

describe('Update Dish Use Case', () => {
    class UpdateDishRepositoryStub {
        async execute() {
            return dish
        }
    }

    class GetDishByIdRepositoryStub {
        async execute() {
            return dish
        }
    }

    const makeSut = () => {
        const updateDishRepository = new UpdateDishRepositoryStub()
        const getDishByIdRepository = new GetDishByIdRepositoryStub()
        const sut = new UpdateDishUseCase(
            updateDishRepository,
            getDishByIdRepository,
        )
        return { sut, updateDishRepository, getDishByIdRepository }
    }

    it('should update dish successfully', async () => {
        const { sut } = makeSut()

        const updatedDish = await sut.execute(dish.id, {
            ...dish,
            imageFilename: 'imagetest.png',
        })

        expect(updatedDish).toEqual({
            ...dish,
            image_url: 'imagetest.png',
        })
    })

    it('should call UpdateDishRepository with correct params', async () => {
        const { sut, updateDishRepository } = makeSut()
        const updateDishRepositorySpy = import.meta.jest.spyOn(
            updateDishRepository,
            'execute',
        )

        await sut.execute(dish.id, {
            ...dish,
            imageFilename: 'imagetest.png',
        })

        expect(updateDishRepositorySpy).toHaveBeenCalledWith(dish.id, {
            ...dish,
            image_url: 'imagetest.png',
        })
    })

    it('should throw if UpdateDishRepository throws', async () => {
        const { sut, updateDishRepository } = makeSut()
        import.meta.jest
            .spyOn(updateDishRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(dish.id, {
            ...dish,
            imageFilename: 'imagetest.png',
        })

        await expect(promise).rejects.toThrow()
    })
})
