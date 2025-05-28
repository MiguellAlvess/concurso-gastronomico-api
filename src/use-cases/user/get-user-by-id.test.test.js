import { GetUserByIdUseCase } from './get-user-by-id.js'
import { user } from '../../tests/index.js'
import { faker } from '@faker-js/faker'

describe('Get User By Id Use Case', () => {
    class GetUserByIdRepositoryStub {
        async execute() {
            return user
        }
    }
    const makeSut = () => {
        const getUserByIdRepository = new GetUserByIdRepositoryStub()
        const sut = new GetUserByIdUseCase(getUserByIdRepository)

        return {
            sut,
            getUserByIdRepository,
        }
    }

    it('should get user by id successfully', async () => {
        const { sut } = makeSut()

        const getUser = await sut.execute(faker.string.uuid())

        expect(getUser).toEqual(user)
    })

    it('shoul call GetUserByIdRepository with correct params', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        const getUserByIdRepositorySpy = import.meta.jest.spyOn(
            getUserByIdRepository,
            'execute',
        )
        const userId = faker.string.uuid()

        await sut.execute(userId)

        expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(userId)
    })

    it('should throw if GetUserByIdRepository throws', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByIdRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(faker.string.uuid())

        await expect(promise).rejects.toThrow()
    })
})
