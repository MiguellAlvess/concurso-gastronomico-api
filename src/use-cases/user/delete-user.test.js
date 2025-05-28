import { faker } from '@faker-js/faker'
import { DeleteUserUseCase } from './delete-user.js'
import { user } from '../../tests/index.js'

describe('Delete User Use Case', () => {
    class DeleteUserUseCaseStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const deleteUserUseCase = new DeleteUserUseCaseStub()
        const sut = new DeleteUserUseCase(deleteUserUseCase)

        return { sut, deleteUserUseCase }
    }

    it('should successfully delete a user', async () => {
        const { sut } = makeSut()

        const deletedUser = await sut.execute(faker.string.uuid())

        expect(deletedUser).toBeTruthy()
    })
})
