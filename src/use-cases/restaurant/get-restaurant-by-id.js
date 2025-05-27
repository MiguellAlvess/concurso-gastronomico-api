import { RestaurantNotFoundError } from '../../errors/index.js'

export class GetRestaurantByIdUseCase {
    constructor(getRestaurantByIdRepository) {
        this.getRestaurantByIdRepository = getRestaurantByIdRepository
    }

    async execute(restaurantId) {
        const restaurant =
            await this.getRestaurantByIdRepository.execute(restaurantId)

        if (!restaurant) {
            throw new RestaurantNotFoundError(restaurantId)
        }

        return restaurant
    }
}
