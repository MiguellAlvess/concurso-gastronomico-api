import { LoginUserController } from './login-user.js'
import { user } from '../../tests/index.js'
import { UserNotFoundError } from '../../errors/index.js'

describe('Login User Controller', () => {
    class LoginUserUseCaseStub {
        async execute() {
            return {
                ...user,
                tokens: {
                    accessToken: 'any_acess_token',
                    refreshToken: 'any_refresh_token',
                },
            }
        }
    }
    const makeSut = () => {
        const loginUserUseCase = new LoginUserUseCaseStub()
        const sut = new LoginUserController(loginUserUseCase)

        return { sut, loginUserUseCase }
    }

    const httpRequest = {
        body: {
            email: user.email,
            password: user.password,
        },
    }

    it('should return 200 with user and tokens', async () => {
        const { sut } = makeSut()

        const response = await sut.execute(httpRequest)

        expect(response.statusCode).toBe(200)
        expect(response.body.tokens.accessToken).toBe('any_acess_token')
        expect(response.body.tokens.refreshToken).toBe('any_refresh_token')
    })

    it('should return 404 if user is not found', async () => {
        const { sut, loginUserUseCase } = makeSut()
        import.meta.jest
            .spyOn(loginUserUseCase, 'execute')
            .mockRejectedValueOnce(new UserNotFoundError())

        const response = await sut.execute(httpRequest)

        expect(response.statusCode).toBe(404)
    })
})
