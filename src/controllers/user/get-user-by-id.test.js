import { user } from '../../tests/index.js'
import { GetUserByIdController } from './get-user-by-id'

describe('Get User By Id Controller', () => {
    class GetUserByIdUseCaseStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const getUserByIdUseCase = new GetUserByIdUseCaseStub()
        const sut = new GetUserByIdController(getUserByIdUseCase)

        return { sut, getUserByIdUseCase }
    }

    it('should return 200 when user is found', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute({
            params: {
                userId: user.id,
            },
        })

        // assert
        expect(response.statusCode).toBe(200)
    })

    it('should return 400 if id is not valid', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            params: {
                userId: 'invalid-id',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
})
