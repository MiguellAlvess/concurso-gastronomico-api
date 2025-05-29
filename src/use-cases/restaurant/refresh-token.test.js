import { UnauthorizedError } from '../../errors/shared-errors.js'
import { RefreshTokenRestaurantUseCase } from './refresh-token.js'

describe('Refresh Token Restaurant Use Case', () => {
    class TokensGeneratorRestaurantAdapterStub {
        execute() {
            return {
                accessToken: 'any_acess_token',
                refreshToken: 'any_refresh_token',
            }
        }
    }

    class TokenVerifierAdapterStub {
        execute() {
            return true
        }
    }
    const makeSut = () => {
        const tokensGeneratorRestaurantAdapter =
            new TokensGeneratorRestaurantAdapterStub()
        const tokenVerifierAdapter = new TokenVerifierAdapterStub()
        const sut = new RefreshTokenRestaurantUseCase(
            tokensGeneratorRestaurantAdapter,
            tokenVerifierAdapter,
        )

        return {
            sut,
            tokensGeneratorRestaurantAdapter,
            tokenVerifierAdapter,
        }
    }

    it('should return new tokens', async () => {
        const { sut } = makeSut()
        const refreshToken = 'any_refresh_token'

        const response = await sut.execute(refreshToken)

        expect(response).toEqual({
            accessToken: 'any_acess_token',
            refreshToken: 'any_refresh_token',
        })
    })

    it('should throw UnauthorizedError if TokenVerifierAdapter throws', async () => {
        const { sut, tokenVerifierAdapter } = makeSut()
        import.meta.jest
            .spyOn(tokenVerifierAdapter, 'execute')
            .mockImplementationOnce(() => {
                throw new Error()
            })

        const promise = sut.execute('any_refresh_token')

        await expect(promise).rejects.toThrow(new UnauthorizedError())
    })
})
