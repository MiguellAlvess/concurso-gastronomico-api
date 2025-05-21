import {
    InvalidPasswordError,
    RestaurantNotFoundError,
} from '../../errors/index.js'

export class LoginRestaurantUseCase {
    constructor(
        getRestaurantByCnpjRepository,
        passwordComparatorAdapter,
        tokensGeneratorRestaurantAdapter,
    ) {
        this.getRestaurantByCnpjRepository = getRestaurantByCnpjRepository
        this.passwordComparatorAdapter = passwordComparatorAdapter
        this.tokensGeneratorRestaurantAdapter = tokensGeneratorRestaurantAdapter
    }
    async execute(cnpj, password) {
        const restaurant =
            await this.getRestaurantByCnpjRepository.execute(cnpj)

        if (!restaurant) {
            throw new RestaurantNotFoundError()
        }

        const isPasswordValid = await this.passwordComparatorAdapter.execute(
            password,
            restaurant.password,
        )

        if (!isPasswordValid) {
            throw new InvalidPasswordError()
        }

        return {
            ...restaurant,
            tokens: this.tokensGeneratorRestaurantAdapter.execute(
                restaurant.id,
            ),
        }
    }
}
