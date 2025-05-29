import { UpdateRestaurantUseCase } from './update-restaurant.js'
import { restaurant } from '../../tests/index.js'
import { faker } from '@faker-js/faker'
import { CnpjAlreadyInUseError } from '../../errors/index.js'

describe('Update Restaurant Use Case', () => {
    class GetRestaurantByCnpjRepositoryStub {
        async execute() {
            return null
        }
    }

    class UpdateRestaurantRepositoryStub {
        async execute() {
            return restaurant
        }
    }

    class PasswordHasherAdapterStub {
        async execute() {
            return 'hashed_password'
        }
    }

    const makeSut = () => {
        const getRestaurantByCnpjRepository =
            new GetRestaurantByCnpjRepositoryStub()
        const updateRestaurantRepository = new UpdateRestaurantRepositoryStub()
        const passwordHasherAdapter = new PasswordHasherAdapterStub()
        const sut = new UpdateRestaurantUseCase(
            getRestaurantByCnpjRepository,
            updateRestaurantRepository,
            passwordHasherAdapter,
        )
        return {
            sut,
            getRestaurantByCnpjRepository,
            updateRestaurantRepository,
            passwordHasherAdapter,
        }
    }

    it('should update a restaurant successfully (without cnpj and password)', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(faker.string.uuid(), {
            name: faker.company.name(),
        })

        expect(result).toEqual(restaurant)
    })

    it('should update a restaurant successfully (with cnpj)', async () => {
        const { sut, getRestaurantByCnpjRepository } = makeSut()
        const getRestaurantByCnpjRepositorySpy = import.meta.jest.spyOn(
            getRestaurantByCnpjRepository,
            'execute',
        )
        const cnpj = faker.string.uuid()

        const result = await sut.execute(faker.string.uuid(), {
            cnpj,
        })

        expect(getRestaurantByCnpjRepositorySpy).toHaveBeenCalledWith(cnpj)
        expect(result).toEqual(restaurant)
    })

    it('should update a restaurant successfully (with password)', async () => {
        const { sut, passwordHasherAdapter } = makeSut()
        const passwordHasherAdapterSpy = import.meta.jest.spyOn(
            passwordHasherAdapter,
            'execute',
        )

        const result = await sut.execute(faker.string.uuid(), {
            password: faker.internet.password({
                length: 7,
            }),
        })

        expect(passwordHasherAdapterSpy).toHaveBeenCalled()
        expect(result).toEqual(restaurant)
    })

    it('should throw CnpjIsAlreadyInUseError if cnpj is already in use', async () => {
        const { sut, getRestaurantByCnpjRepository } = makeSut()
        import.meta.jest
            .spyOn(getRestaurantByCnpjRepository, 'execute')
            .mockResolvedValueOnce(restaurant)

        const result = sut.execute(faker.string.uuid(), {
            cnpj: restaurant.cnpj,
        })

        await expect(result).rejects.toThrow(
            new CnpjAlreadyInUseError(restaurant.cnpj),
        )
    })

    it('should call UpdateRestaurantRepository with correct params', async () => {
        const { sut, updateRestaurantRepository } = makeSut()
        const updateRestaurantRepositorySpy = import.meta.jest.spyOn(
            updateRestaurantRepository,
            'execute',
        )
        const updateRestaurantParams = {
            name: faker.company.name(),
            password: faker.internet.password({
                length: 7,
            }),
            cnpj: '35.424.884/0001-96',
        }

        await sut.execute(restaurant.id, updateRestaurantParams)

        expect(updateRestaurantRepositorySpy).toHaveBeenCalledWith(
            restaurant.id,
            {
                ...updateRestaurantParams,
                password: 'hashed_password',
            },
        )
    })

    it('should throw if UpdateRestaurantRepository throws', async () => {
        const { sut, updateRestaurantRepository } = makeSut()
        import.meta.jest
            .spyOn(updateRestaurantRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = sut.execute(faker.string.uuid(), {
            name: faker.company.name(),
        })

        await expect(result).rejects.toThrow(new Error())
    })
})
