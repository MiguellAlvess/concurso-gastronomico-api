import { CreateDishUseCase } from './create-dish.js'
import { dish } from '../../tests/index.js'

describe('Create Dish Use Case', () => {
    class CreateDishRepositoryStub {
        async execute() {
            return dish
        }
    }

    class GetRestaurantByIdRepositoryStub {
        async execute() {
            return true
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'generated-id'
        }
    }
    const makeSut = () => {
        const createDishRepository = new CreateDishRepositoryStub()
        const getRestaurantByIdRepository =
            new GetRestaurantByIdRepositoryStub()
        const idGeneratorAdapter = new IdGeneratorAdapterStub()
        const sut = new CreateDishUseCase(
            createDishRepository,
            getRestaurantByIdRepository,
            idGeneratorAdapter,
        )

        return {
            sut,
            createDishRepository,
            getRestaurantByIdRepository,
            idGeneratorAdapter,
        }
    }

    it('should successfully create a dish', async () => {
        const { sut } = makeSut()

        const createdDish = await sut.execute(dish)

        expect(createdDish).toBeTruthy()
    })

    it('should call IdGeneratorAdapter to generate a random id', async () => {
        const { sut, idGeneratorAdapter, createDishRepository } = makeSut()
        const idGeneratorAdapterSpy = import.meta.jest.spyOn(
            idGeneratorAdapter,
            'execute',
        )
        const createDishRepositorySpy = import.meta.jest.spyOn(
            createDishRepository,
            'execute',
        )

        await sut.execute({
            ...dish,
            imageFilename: 'imagetest.png',
        })

        expect(idGeneratorAdapterSpy).toHaveBeenCalled()
        expect(createDishRepositorySpy).toHaveBeenCalledWith({
            ...dish,
            image_url: 'imagetest.png',
            id: 'generated-id',
        })
    })

    it('should throw if GetRestaurantByIdRepository throws', async () => {
        const { sut, getRestaurantByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getRestaurantByIdRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute({
            ...dish,
            imageFilename: 'imagetest.png',
        })

        await expect(promise).rejects.toThrow()
    })
})
