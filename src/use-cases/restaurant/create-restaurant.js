import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'
import { CnpjAlreadyInUseError } from '../../errors/restaurant.js'

export class CreateRestaurantUseCase {
    constructor(getRestaurantByCnpjRepository, createRestaurantRepository) {
        this.getRestaurantByCnpjRepository = getRestaurantByCnpjRepository
        this.createRestaurantRepository = createRestaurantRepository
    }

    async execute(createRestaurantParams) {
        const restaurantWithProvidedCnpj =
            await this.getRestaurantByCnpjRepository.execute(
                createRestaurantParams.cnpj,
            )
        if (restaurantWithProvidedCnpj) {
            throw new CnpjAlreadyInUseError(createRestaurantParams.cnpj)
        }
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
