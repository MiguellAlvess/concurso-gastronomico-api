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

        return { sut, createDishRepository, getRestaurantByIdRepository }
    }

    it('should successfully create a dish', async () => {
        const { sut } = makeSut()

        const createdDish = await sut.execute(dish)

        expect(createdDish).toBeTruthy()
    })
})
