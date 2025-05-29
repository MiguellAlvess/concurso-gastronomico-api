import { CreateRestaurantUseCase } from './create-restaurant.js'
import { restaurant } from '../../tests/index.js'
import { CnpjAlreadyInUseError } from '../../errors/index.js'
import { it } from '@faker-js/faker'

describe('Create Restaurant Use Case', () => {
    class GetRestaurantByCnpjRepositoryStub {
        async execute() {
            return null
        }
    }

    class CreateRestaurantRepositoryStub {
        async execute() {
            return restaurant
        }
    }

    class PasswordHasherAdapterStub {
        execute() {
            return 'hashed_password'
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'generated_id'
        }
    }

    class TokensGeneratorRestaurantAdapterStub {
        execute() {
            return {
                accessToken: 'access_token',
                refreshToken: 'refresh_token',
            }
        }
    }

    const makeSut = () => {
        const getRestaurantByCnpjRepository =
            new GetRestaurantByCnpjRepositoryStub()
        const createRestaurantRepository = new CreateRestaurantRepositoryStub()
        const passwordHasherAdapter = new PasswordHasherAdapterStub()
        const idGeneratorAdapter = new IdGeneratorAdapterStub()
        const tokensGeneratorRestaurantAdapter =
            new TokensGeneratorRestaurantAdapterStub()
        const sut = new CreateRestaurantUseCase(
            getRestaurantByCnpjRepository,
            createRestaurantRepository,
            passwordHasherAdapter,
            idGeneratorAdapter,
            tokensGeneratorRestaurantAdapter,
        )
        return {
            sut,
            getRestaurantByCnpjRepository,
            createRestaurantRepository,
            passwordHasherAdapter,
            idGeneratorAdapter,
            tokensGeneratorRestaurantAdapter,
        }
    }

    it('should should successfully create a user', async () => {
        const { sut } = makeSut()

        const createdRestaurant = await sut.execute({
            ...restaurant,
            imageFilename: 'imagetest.png',
        })

        expect(createdRestaurant).toBeTruthy()
        expect(createdRestaurant.tokens.accessToken).toBeDefined()
        expect(createdRestaurant.tokens.refreshToken).toBeDefined()
    })

    it('should throw an CnpjAlreadyInUseError if GetRestaurantByCnpjRepository returns a restaurant', async () => {
        const { sut, getRestaurantByCnpjRepository } = makeSut()
        import.meta.jest
            .spyOn(getRestaurantByCnpjRepository, 'execute')
            .mockResolvedValueOnce(restaurant)

        const promise = sut.execute({
            ...restaurant,
            imageFilename: 'imagetest.png',
        })

        await expect(promise).rejects.toThrow(
            new CnpjAlreadyInUseError(restaurant.cnpj),
        )
    })

    it('should call IdGenerateAdapter to generate a random id', async () => {
        const { sut, idGeneratorAdapter, createRestaurantRepository } =
            makeSut()
        const idGeneratorAdapterSpy = import.meta.jest.spyOn(
            idGeneratorAdapter,
            'execute',
        )
        const createRestaurantRepositorySpy = import.meta.jest.spyOn(
            createRestaurantRepository,
            'execute',
        )

        await sut.execute({
            ...restaurant,
            imageFilename: 'imagetest.png',
        })

        expect(idGeneratorAdapterSpy).toHaveBeenCalled()
        expect(createRestaurantRepositorySpy).toHaveBeenCalledWith({
            cnpj: restaurant.cnpj,
            name: restaurant.name,
            password: 'hashed_password',
            id: 'generated_id',
            image_url: `/uploads/imagetest.png`,
        })
    })
})
