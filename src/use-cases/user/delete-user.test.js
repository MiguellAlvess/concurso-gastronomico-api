import { faker } from '@faker-js/faker'
import { DeleteUserUseCase } from './delete-user.js'
import { user } from '../../tests/index.js'

describe('Delete User Use Case', () => {
    class DeleteUserRepositoryStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const deleteUserRepository = new DeleteUserRepositoryStub()
        const sut = new DeleteUserUseCase(deleteUserRepository)

        return { sut, deleteUserRepository }
    }

    it('should successfully delete a user', async () => {
        const { sut } = makeSut()

        const deletedUser = await sut.execute(faker.string.uuid())

        expect(deletedUser).toBeTruthy()
    })

    it('should throw if DeleteUserRepository', async () => {
        const { sut, deleteUserRepository } = makeSut()
        import.meta.jest
            .spyOn(deleteUserRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(faker.string.uuid())

        await expect(promise).rejects.toThrow()
    })
})
