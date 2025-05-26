export class GetAllRestaurantsUseCase {
    constructor(getAllRestaurantsRepository) {
        this.getAllRestaurantsRepository = getAllRestaurantsRepository
    }

    async execute() {
        const allRestaurants = await this.getAllRestaurantsRepository.execute()

        return allRestaurants
    }
}
