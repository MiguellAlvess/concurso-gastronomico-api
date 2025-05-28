import { faker } from '@faker-js/faker'
import { UpdateUserUseCase } from './update-user.js'
import { user } from '../../tests/index.js'

describe('Update User Use Case', () => {
    class GetUserByEmailRepositoryStub {
        async execute() {
            return null
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

    it('should update user successfully (whithout email and password)', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(faker.string.uuid(), {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
        })

        expect(result).toEqual(user)
    })

    it('should update user successfully (with email)', async () => {
        const { sut, getUserByEmailRepository } = makeSut()
        const getUserByEmailRepositorySpy = import.meta.jest.spyOn(
            getUserByEmailRepository,
            'execute',
        )
        const email = faker.internet.email()

        const result = await sut.execute(faker.string.uuid(), {
            email,
        })

        expect(getUserByEmailRepositorySpy).toHaveBeenCalledWith(email)
        expect(result).toEqual(user)
    })

    it('should update user successfully (with password)', async () => {
        const { sut, passwordHasherAdapter } = makeSut()
        const passwordHasherAdapterSpy = import.meta.jest.spyOn(
            passwordHasherAdapter,
            'execute',
        )
        const password = faker.internet.password({
            length: 7,
        })

        const result = await sut.execute(faker.string.uuid(), {
            password,
        })

        expect(passwordHasherAdapterSpy).toHaveBeenCalledWith(password)
        expect(result).toEqual(user)
    })
})
