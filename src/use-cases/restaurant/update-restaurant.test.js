import { UpdateRestaurantUseCase } from './update-restaurant.js'
import { restaurant } from '../../tests/index.js'
import { faker } from '@faker-js/faker'

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
})
