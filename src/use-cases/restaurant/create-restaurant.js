import { CnpjAlreadyInUseError } from '../../errors/restaurant.js'

export class CreateRestaurantUseCase {
    constructor(
        getRestaurantByCnpjRepository,
        createRestaurantRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
        tokensGeneratorRestaurantAdapter,
    ) {
        this.getRestaurantByCnpjRepository = getRestaurantByCnpjRepository
        this.createRestaurantRepository = createRestaurantRepository
        this.passwordHasherAdapter = passwordHasherAdapter
        this.idGeneratorAdapter = idGeneratorAdapter
        this.tokensGeneratorRestaurantAdapter = tokensGeneratorRestaurantAdapter
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

        return {
            ...createdRestaurant,
            tokens: this.tokensGeneratorRestaurantAdapter.execute(
                createdRestaurant.id,
            ),
        }
    }
}
