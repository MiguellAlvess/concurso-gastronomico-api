import { DishNotFoundError, ForbiddenError } from '../../errors/index.js'

export class DeleteDishUseCase {
    constructor(deleteDishRepository, getDishByIdRepository) {
        this.deleteDishRepository = deleteDishRepository
        this.getDishByIdRepository = getDishByIdRepository
    }

    async execute(dishId, restaurantId) {
        const dish = await this.getDishByIdRepository.execute(dishId)

        if (!dish) {
            throw new DishNotFoundError(dishId)
        }

        if (dish.restaurant_id !== restaurantId) {
            throw new ForbiddenError()
        }
        const deletedDish = await this.deleteDishRepository.execute(dishId)

        return deletedDish
    }
}
