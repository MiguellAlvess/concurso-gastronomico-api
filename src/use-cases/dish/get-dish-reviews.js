import { DishNotFoundError } from '../../errors/dish.js'

export class GetDishReviewsUseCase {
    constructor(getDishReviewsRepository, getDishByIdRepository) {
        this.getDishReviewsRepository = getDishReviewsRepository
        this.getDishByIdRepository = getDishByIdRepository
    }

    async execute(dishId) {
        const dish = await this.getDishByIdRepository.execute(dishId)

        if (!dish) {
            throw new DishNotFoundError(dishId)
        }

        const reviews = await this.getDishReviewsRepository.execute(dishId)

        return reviews
    }
}
