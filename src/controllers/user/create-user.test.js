import { user } from '../../tests/index.js'
import { CreateUserController } from './create-user.js'

describe('Create User Controller', () => {
    class CreateUserRepositoryStub {
        async execute() {
            return user
        }
    }
    const makeSut = () => {
        const createUserRepository = new CreateUserRepositoryStub()
        const sut = new CreateUserController(createUserRepository)

        return { sut, createUserRepository }
    }

    const httpRequest = {
        body: {
            ...user,
            id: undefined,
        },
    }

    it('should returns 201 when creating a user successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute(httpRequest)

        // assert
        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual(user)
    })
})
