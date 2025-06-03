import { DeleteDishUseCase } from './delete-dish.js'
import { dish } from '../../tests/index.js'

describe('Delete Dish Use Case', () => {
    class DeleteDishRepository {
        async execute() {
            return dish
        }
    }

    class GetDishByIdRepository {
        async execute() {
            return dish
        }
    }

    const makeSut = () => {
        const deleteDishRepository = new DeleteDishRepository()
        const getDishByIdRepository = new GetDishByIdRepository()
        const sut = new DeleteDishUseCase(
            deleteDishRepository,
            getDishByIdRepository,
        )

        return { sut, deleteDishRepository, getDishByIdRepository }
    }

    it('should successfully delete a dish', async () => {
        const { sut } = makeSut()

        const deletedDish = await sut.execute(dish.id, dish.restaurant_id)

        expect(deletedDish).toBeTruthy()
    })

    it('should call DeleteDishRepository with correct params', async () => {
        const { sut, deleteDishRepository } = makeSut()
        const deleteDishRepositorySpy = import.meta.jest.spyOn(
            deleteDishRepository,
            'execute',
        )

        await sut.execute(dish.id, dish.restaurant_id)

        expect(deleteDishRepositorySpy).toHaveBeenCalledWith(dish.id)
    })
})
