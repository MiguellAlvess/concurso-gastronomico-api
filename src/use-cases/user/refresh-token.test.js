import { RefreshTokenUserUseCase } from './refresh-token.js'

describe('Refresh Token User Use Case', () => {
    class TokensGeneratorUserAdapterStub {
        execute() {
            return {
                acessToken: 'any_token',
                refreshToken: 'any_token',
            }
        }
    }

    class TokenVerifierAdapter {
        execute() {
            return true
        }
    }

    const makeSut = () => {
        const tokensGeneratorUserAdapter = new TokensGeneratorUserAdapterStub()
        const tokenVerifierAdapter = new TokenVerifierAdapter()
        const sut = new RefreshTokenUserUseCase(
            tokensGeneratorUserAdapter,
            tokenVerifierAdapter,
        )

        return {
            sut,
            tokensGeneratorUserAdapter,
            tokenVerifierAdapter,
        }
    }

    it('should return new tokens', async () => {
        const { sut } = makeSut()
        const refreshToken = 'any_refresh_token'

        const result = await sut.execute(refreshToken)

        expect(result).toEqual({
            acessToken: 'any_token',
            refreshToken: 'any_token',
        })
    })
})
