import { RestaurantNotFoundError } from '../../errors/restaurant.js'

export class GetDishesByRestaurantIdUseCase {
    constructor(
        getDishesByRestaurantIdRepository,
        getRestaurantByIdRepository,
    ) {
        this.getDishesByRestaurantIdRepository =
            getDishesByRestaurantIdRepository
        this.getRestaurantByIdRepository = getRestaurantByIdRepository
    }

    async execute(restaurantId) {
        const restaurant =
            await this.getRestaurantByIdRepository.execute(restaurantId)

        if (!restaurant) {
            throw new RestaurantNotFoundError(restaurantId)
        }

        const dishes =
            await this.getDishesByRestaurantIdRepository.execute(restaurantId)

        return dishes
    }
}
