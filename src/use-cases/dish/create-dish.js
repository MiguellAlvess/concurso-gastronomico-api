import { RestaurantNotFoundError } from '../../errors/restaurant.js'

export class CreateDishUseCase {
    constructor(
        createDishRepository,
        getRestaurantByIdRepository,
        idGeneratorAdapter,
    ) {
        this.createDishRepository = createDishRepository
        this.getRestaurantByIdRepository = getRestaurantByIdRepository
        this.idGeneratorAdapter = idGeneratorAdapter
    }

    async execute(createDishParams) {
        const restaurantId = createDishParams.restaurant_id

        const restaurant =
            await this.getRestaurantByIdRepository.execute(restaurantId)

        if (!restaurant) {
            throw new RestaurantNotFoundError(restaurantId)
        }

        const dishId = this.idGeneratorAdapter.generate()

        const dish = await this.createDishRepository.execute({
            ...createDishParams,
            id: dishId,
        })

        return dish
    }
}
