import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

export class CreateRestaurantUseCase {
    constructor(createRestaurantRepository) {
        this.createRestaurantRepository = createRestaurantRepository
    }

    async execute(createRestaurantParams) {
        const restaurantId = uuid()

        const hashedPassword = await bcrypt.hash(
            createRestaurantParams.password,
            10,
        )
        const restaurant = {
            ...createRestaurantParams,
            id: restaurantId,
            password: hashedPassword,
        }

        const createdRestaurant =
            await this.createRestaurantRepository.execute(restaurant)

        return createdRestaurant
    }
}
