export class DeleteRestaurantUseCase {
    constructor(deleteRestaurantRepository) {
        this.deleteRestaurantRepository = deleteRestaurantRepository
    }

    async execute(restaurantId) {
        const deletedRestaurant =
            await this.deleteRestaurantRepository.execute(restaurantId)

        return deletedRestaurant
    }
}
