import { ForbiddenError } from '../../errors/index.js'

export class UpdateDishUseCase {
    constructor(updateDishRepository, getDishByIdRepository) {
        this.updateDishRepository = updateDishRepository
        this.getDishByIdRepository = getDishByIdRepository
    }

    async execute(dishId, params) {
        const dish = await this.getDishByIdRepository.execute(dishId)

        if (dish.restaurant_id !== params.restaurant_id) {
            throw new ForbiddenError()
        }
        const updatedDish = await this.updateDishRepository.execute(
            dishId,
            params,
        )

        return updatedDish
    }
}
