import { LoginRestaurantController } from './login-restaurant.js'
import { restaurant } from '../../tests/index.js'

describe('Login Restaurant Controller', () => {
    class LoginRestaurantUseCaseStub {
        async execute() {
            return {
                ...restaurant,
                tokens: {
                    accessToken: 'any_acess_token',
                    refreshToken: 'any_refresh_token',
                },
            }
        }
    }

    const httpRequest = {
        body: {
            cnpj: '51.419.548/0001-01',
            password: restaurant.password,
        },
    }

    const makeSut = () => {
        const loginRestaurantUseCase = new LoginRestaurantUseCaseStub()
        const sut = new LoginRestaurantController(loginRestaurantUseCase)

        return { sut, loginRestaurantUseCase }
    }

    it('should return 200 with restaurant and tokens', async () => {
        const { sut } = makeSut()

        const response = await sut.execute(httpRequest)

        expect(response.statusCode).toBe(200)
        expect(response.body.tokens.accessToken).toBe('any_acess_token')
        expect(response.body.tokens.refreshToken).toBe('any_refresh_token')
    })
})
