export class GetRestaurantByIdUseCase {
    constructor(getRestaurantByIdRepository) {
        this.getRestaurantByIdRepository = getRestaurantByIdRepository
    }

    async execute(restaurantId) {
        const restaurant =
            await this.getRestaurantByIdRepository.execute(restaurantId)

        return restaurant
    }
}
