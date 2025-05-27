import { RefreshTokenRestaurantController } from './refresh-token.js'

describe('Refresh Token User Controller', () => {
    class RefreshTokenRestaurantUseCaseStub {
        execute() {
            return {
                accessToken: 'any_acess_token',
                refreshToken: 'any_refresh_token',
            }
        }
    }
    const makeSut = () => {
        const refreshTokenRestaurantUseCase =
            new RefreshTokenRestaurantUseCaseStub()
        const sut = new RefreshTokenRestaurantController(
            refreshTokenRestaurantUseCase,
        )
        return { sut, refreshTokenRestaurantUseCase }
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

    it('should return 500 when RefreshTokenUserUseCase throws', async () => {
        const { sut, refreshTokenRestaurantUseCase } = makeSut()
        import.meta.jest
            .spyOn(refreshTokenRestaurantUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        const response = await sut.execute({
            body: {
                refreshToken: 'any_refresh_token',
            },
        })

        expect(response.statusCode).toBe(500)
    })
})
