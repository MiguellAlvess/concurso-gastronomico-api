import { CreateRestaurantUseCase } from './create-restaurant.js'
import { restaurant } from '../../tests/index.js'

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
})
