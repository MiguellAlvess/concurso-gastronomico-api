import { UnauthorizedError } from '../../errors/index.js'

export class RefreshTokenRestaurantUseCase {
    constructor(tokensGeneratorRestaurantAdapter, tokenVerifierAdapter) {
        this.tokensGeneratorRestaurantAdapter = tokensGeneratorRestaurantAdapter
        this.tokenVerifierAdapter = tokenVerifierAdapter
    }

    async execute(refreshToken) {
        try {
            const decodedToken = this.tokenVerifierAdapter.execute(
                refreshToken,
                process.env.JWT_REFRESH_TOKEN_SECRET,
            )

            if (!decodedToken) {
                throw new UnauthorizedError()
            }

            return this.tokensGeneratorRestaurantAdapter.execute(
                decodedToken.restaurantId,
            )
        } catch (error) {
            console.error(error)
            throw new UnauthorizedError()
        }
    }
}
