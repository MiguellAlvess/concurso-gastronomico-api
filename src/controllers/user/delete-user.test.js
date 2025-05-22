import { faker } from '@faker-js/faker'
import { user } from '../../tests/index.js'
import { DeleteUserController } from './delete-user.js'
import { UserNotFoundError } from '../../errors/user.js'

describe('Delete User Controller', () => {
    class DeleteUserUseCaseStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const deleteUserUseCase = new DeleteUserUseCaseStub()
        const sut = new DeleteUserController(deleteUserUseCase)

        return { sut, deleteUserUseCase }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    }

    it('should return 200 when deleting a user successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute(httpRequest)

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

    it('should return 404 if user is not found', async () => {
        // arrange
        const { sut, deleteUserUseCase } = makeSut()
        import.meta.jest
            .spyOn(deleteUserUseCase, 'execute')
            .mockRejectedValueOnce(new UserNotFoundError())

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(404)
    })

    it('should return 500 if DeleteUserUseCase throws', async () => {
        // arrange
        const { sut, deleteUserUseCase } = makeSut()
        import.meta.jest
            .spyOn(deleteUserUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(500)
    })

    it('should call DeleteUserUseCase with correct params', async () => {
        // arrange
        const { sut, deleteUserUseCase } = makeSut()
        const executeSpy = import.meta.jest.spyOn(deleteUserUseCase, 'execute')

        // act
        await sut.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.userId)
    })
})
