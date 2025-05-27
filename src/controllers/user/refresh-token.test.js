import { RefreshTokenUserController } from './refresh-token.js'

describe('Refresh Token User Controller', () => {
    class RefreshTokenUserUseCaseStub {
        execute() {
            return {
                accessToken: 'any_acess_token',
                refreshToken: 'any_refresh_token',
            }
        }
    }
    const makeSut = () => {
        const refreshTokenUserUseCase = new RefreshTokenUserUseCaseStub()
        const sut = new RefreshTokenUserController(refreshTokenUserUseCase)
        return { sut, refreshTokenUserUseCase }
    }

    it('should return 200 if refresh token is valid', async () => {
        const { sut } = makeSut()

        const response = await sut.execute({
            body: {
                refreshToken: 'any_refresh_token',
            },
        })

        expect(response.statusCode).toBe(200)
    })

    it('should return 400 if refresh token is not valid', async () => {
        const { sut } = makeSut()

        const response = await sut.execute({
            body: {
                refreshToken: 0,
            },
        })

        expect(response.statusCode).toBe(400)
    })
})
