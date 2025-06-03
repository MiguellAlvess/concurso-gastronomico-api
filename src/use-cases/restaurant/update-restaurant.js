import { CnpjAlreadyInUseError } from '../../errors/restaurant.js'

export class UpdateRestaurantUseCase {
    constructor(
        getRestaurantByCnpjRepository,
        updateRestaurantRepository,
        passwordHasherAdapter,
    ) {
        this.getRestaurantByCnpjRepository = getRestaurantByCnpjRepository
        this.updateRestaurantRepository = updateRestaurantRepository
        this.passwordHasherAdapter = passwordHasherAdapter
    }

    async execute(restaurantId, updateRestaurantParams) {
        if (updateRestaurantParams.cnpj) {
            const restaurantWithProvidedCnpj =
                await this.getRestaurantByCnpjRepository.execute(
                    updateRestaurantParams.cnpj,
                )
            if (
                restaurantWithProvidedCnpj &&
                restaurantWithProvidedCnpj.id !== restaurantId
            ) {
                throw new CnpjAlreadyInUseError(updateRestaurantParams.cnpj)
            }
        }

        const restaurant = {
            ...updateRestaurantParams,
        }

        if (updateRestaurantParams.imageFilename) {
            restaurant.image_url = `/uploads/${updateRestaurantParams.imageFilename}`
            delete restaurant.imageFilename
        }

        if (updateRestaurantParams.password) {
            const hashedPassword = await this.passwordHasherAdapter.execute(
                updateRestaurantParams.password,
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
