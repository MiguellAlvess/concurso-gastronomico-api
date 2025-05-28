import { faker } from '@faker-js/faker'
import { UpdateUserUseCase } from './update-user.js'
import { user } from '../../tests/index.js'
import { EmailAlreadyInUseError } from '../../errors/user.js'

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

    it('should throw EmailAlreadyInUseError if email is already in use', async () => {
        const { sut, getUserByEmailRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByEmailRepository, 'execute')
            .mockResolvedValueOnce(user)

        const result = sut.execute(faker.string.uuid(), {
            email: user.email,
        })

        await expect(result).rejects.toThrow(
            new EmailAlreadyInUseError(user.email),
        )
    })

    it('should call UpdateUserRepository with correct params', async () => {
        const { sut, updateUserRepository } = makeSut()
        const updateUserRepositorySpy = import.meta.jest.spyOn(
            updateUserRepository,
            'execute',
        )
        const updateUserParams = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
        }

        await sut.execute(user.id, updateUserParams)

        expect(updateUserRepositorySpy).toHaveBeenCalledWith(user.id, {
            ...updateUserParams,
            password: 'hashed_password',
        })
    })

    it('should throw if UpdateUserRepository throws', async () => {
        const { sut, updateUserRepository } = makeSut()
        import.meta.jest
            .spyOn(updateUserRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = sut.execute(faker.string.uuid(), {
            firt_name: faker.person.firstName(),
        })

        await expect(result).rejects.toThrow()
    })
})
