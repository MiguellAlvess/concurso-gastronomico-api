import { DishNotFoundError } from '../../errors/dish.js'

export class GetReviewsByDishIdUseCase {
    constructor(getReviewsByDishIdRepository, getDishByIdRepository) {
        this.getReviewsByDishIdRepository = getReviewsByDishIdRepository
        this.getDishByIdRepository = getDishByIdRepository
    }

    async execute(dishId) {
        const dish = await this.getDishByIdRepository.execute(dishId)

        if (!dish) {
            throw new DishNotFoundError(dishId)
        }

        const reviews = await this.getReviewsByDishIdRepository.execute(dishId)

        return reviews
    }
}
