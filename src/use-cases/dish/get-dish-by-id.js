import { DishNotFoundError } from '../../errors/index.js'

export class GetDishByIdUseCase {
    constructor(getDishByIdRepository) {
        this.getDishByIdRepository = getDishByIdRepository
    }

    async execute(dishId) {
        const dish = await this.getDishByIdRepository.execute(dishId)

        if (!dish) {
            throw new DishNotFoundError(dishId)
        }

        return dish
    }
}
