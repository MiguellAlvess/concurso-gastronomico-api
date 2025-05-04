import { v4 as uuid } from 'uuid'
import { RestaurantNotFoundError } from '../../errors/restaurant'

export class CreateDishUseCase {
    constructor(createDishRepository, getRestaurantByIdRepository) {
        this.createDishRepository = createDishRepository
        this.getRestaurantByIdRepository = getRestaurantByIdRepository
    }

    async execute(createDishParams) {
        const restaurantId = createDishParams.restaurantId

        const restaurant =
            await this.getRestaurantByIdRepository.execute(restaurantId)

        if (!restaurant) {
            throw new RestaurantNotFoundError(restaurantId)
        }

        const dishId = uuid()

        const dish = {
            ...createDishParams,
            id: dishId,
        }

        return dish
    }
}
