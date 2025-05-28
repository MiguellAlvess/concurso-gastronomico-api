import { faker } from '@faker-js/faker'
import { UpdateUserUseCase } from './update-user.js'
import { user } from '../../tests/index.js'

describe('Update User Use Case', () => {
    class GetUserByEmailRepositoryStub {
        async execute() {
            return true
        }
    }

    class UpdateUserRepositoryStub {
        async execute() {
            return user
        }
    }

    class PasswordHasherAdapterStub {
        async execute() {
            return 'hashed_password'
        }
    }

    const makeSut = () => {
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub()
        const updateUserRepository = new UpdateUserRepositoryStub()
        const passwordHasherAdapter = new PasswordHasherAdapterStub()
        const sut = new UpdateUserUseCase(
            getUserByEmailRepository,
            updateUserRepository,
            passwordHasherAdapter,
        )

        return {
            sut,
            getUserByEmailRepository,
            updateUserRepository,
            passwordHasherAdapter,
        }
    }

    it('should update user successfully', async () => {
        const { sut } = makeSut()

        const updatedUser = await sut.execute(faker.string.uuid(), {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
        })

        expect(updatedUser).toEqual(user)
    })
})
