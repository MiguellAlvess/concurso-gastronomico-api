import { CnpjAlreadyInUseError } from '../../errors/restaurant.js'

export class CreateRestaurantUseCase {
    constructor(
        getRestaurantByCnpjRepository,
        createRestaurantRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
    ) {
        this.getRestaurantByCnpjRepository = getRestaurantByCnpjRepository
        this.createRestaurantRepository = createRestaurantRepository
        this.passwordHasherAdapter = passwordHasherAdapter
        this.idGeneratorAdapter = idGeneratorAdapter
    }

    async execute(createRestaurantParams) {
        const restaurantWithProvidedCnpj =
            await this.getRestaurantByCnpjRepository.execute(
                createRestaurantParams.cnpj,
            )
        if (restaurantWithProvidedCnpj) {
            throw new CnpjAlreadyInUseError(createRestaurantParams.cnpj)
        }
        const restaurantId = this.idGeneratorAdapter.execute()

        const hashedPassword = await this.passwordHasherAdapter.execute(
            createRestaurantParams.password,
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
