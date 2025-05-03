import bcrypt from 'bcrypt'
import { CnpjAlreadyInUseError } from '../../errors/restaurant.js'

export class UpdateRestaurantUseCase {
    constructor(getRestaurantByCnpjRepository, updateRestaurantRepository) {
        this.getRestaurantByCnpjRepository = this.updateRestaurantRepository =
            updateRestaurantRepository
    }

    async execute(restaurantId, updateRestaurantParams) {
        if (updateRestaurantParams.cnpj) {
            const restaurantWithProvidedCnpj =
                await this.getRestaurantByCnpjRepository.execute(
                    updateRestaurantParams.cnpj,
                )
            if (restaurantWithProvidedCnpj) {
                throw new CnpjAlreadyInUseError(updateRestaurantParams.cnpj)
            }
        }

        const restaurant = {
            ...updateRestaurantParams,
        }

        if (updateRestaurantParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateRestaurantParams.password,
                10,
            )

            restaurant.password = hashedPassword
        }

        const updateRestaurant = await this.updateRestaurantRepository.execute(
            restaurantId,
            restaurant,
        )

        return updateRestaurant
    }
}
