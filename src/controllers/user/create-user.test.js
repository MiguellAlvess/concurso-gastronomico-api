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
    it('should return 400 if first_name is not provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest,
                first_name: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
    it('should return 400 if last_name is not provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest,
                last_name: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
})
