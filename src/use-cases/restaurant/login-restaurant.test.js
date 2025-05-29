import { LoginRestaurantUseCase } from './login-restaurant.js'
import { restaurant } from '../../tests/index.js'

describe('Login Restaurant Use Case', () => {
    class GetRestaurantByCnpjRepositoryStub {
        async execute() {
            return restaurant
        }
    }

    class PasswordComparatorAdapterStub {
        execute() {
            return true
        }
    }

    class TokenVerifierAdapterStub {
        execute() {
            return {
                accessToken: 'any_access_token',
                refreshToken: 'any_refresh_token',
            }
        }
    }

    const makeSut = () => {
        const getRestaurantByCnpjRepository =
            new GetRestaurantByCnpjRepositoryStub()
        const passwordComparatorAdapter = new PasswordComparatorAdapterStub()
        const tokenVerifierAdapter = new TokenVerifierAdapterStub()
        const sut = new LoginRestaurantUseCase(
            getRestaurantByCnpjRepository,
            passwordComparatorAdapter,
            tokenVerifierAdapter,
        )

        return {
            sut,
            getRestaurantByCnpjRepository,
            passwordComparatorAdapter,
            tokenVerifierAdapter,
        }
    }

    it('should return restaurant with tokens', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(restaurant.cnpj, restaurant.password)

        expect(result.tokens.accessToken).toBe('any_access_token')
        expect(result.tokens.refreshToken).toBe('any_refresh_token')
    })
})
