import { v4 as uuid } from 'uuid'
import { RestaurantNotFoundError } from '../../errors/restaurant.js'

export class CreateDishUseCase {
    constructor(createDishRepository, getRestaurantByIdRepository) {
        this.createDishRepository = createDishRepository
        this.getRestaurantByIdRepository = getRestaurantByIdRepository
    }

    async execute(createDishParams) {
        const restaurantId = createDishParams.restaurant_id

        const restaurant =
            await this.getRestaurantByIdRepository.execute(restaurantId)

        if (!restaurant) {
            throw new RestaurantNotFoundError(restaurantId)
        }

        const dishId = uuid()

        const dish = await this.createDishRepository.execute({
            ...createDishParams,
            id: dishId,
        })

        return dish
    }
}
