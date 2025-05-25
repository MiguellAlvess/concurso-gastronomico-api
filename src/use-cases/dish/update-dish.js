import { DishNotFoundError, ForbiddenError } from '../../errors/index.js'

export class UpdateDishUseCase {
    constructor(updateDishRepository, getDishByIdRepository) {
        this.updateDishRepository = updateDishRepository
        this.getDishByIdRepository = getDishByIdRepository
    }

    async execute(dishId, updateDishParams) {
        const dish = await this.getDishByIdRepository.execute(dishId)

        if (dish.restaurant_id !== updateDishParams.restaurant_id) {
            throw new ForbiddenError()
        }

        if (!dish) {
            throw new DishNotFoundError(dishId)
        }

        if (updateDishParams.imageFilename) {
            updateDishParams.image_url = updateDishParams.imageFilename
            delete updateDishParams.imageFilename
        }

        const updatedDish = await this.updateDishRepository.execute(
            dishId,
            updateDishParams,
        )

        return updatedDish
    }
}
