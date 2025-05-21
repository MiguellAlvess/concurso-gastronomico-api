import { UnauthorizedError } from '../../errors/index.js'

export class RefreshTokenUserUseCase {
    constructor(tokensGeneratorUserAdapter, tokenVerifierAdapter) {
        this.tokensGeneratorUserAdapter = tokensGeneratorUserAdapter
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

            return this.tokensGeneratorUserAdapter.execute(decodedToken.userId)
        } catch (error) {
            console.error(error)
            throw new UnauthorizedError()
        }
    }
}
