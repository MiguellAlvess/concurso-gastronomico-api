import { faker } from '@faker-js/faker'
import { restaurant } from '../../tests/index.js'
import { CreateRestaurantController } from './create-restaurant'
import { CnpjAlreadyInUseError } from '../../errors/restaurant.js'

describe('Create Restaurant Controller', () => {
    class CreateRestaurantUseCaseStub {
        async execute() {
            return restaurant
        }
    }

    const makeSut = () => {
        const createRestaurantUseCase = new CreateRestaurantUseCaseStub()
        const sut = new CreateRestaurantController(createRestaurantUseCase)

        return { sut, createRestaurantUseCase }
    }
    const httpRequest = {
        body: {
            ...restaurant,
            id: undefined,
        },
    }

    it('should return 201 when creating a restaurant successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute(httpRequest)

        // assert
        expect(response.statusCode).toBe(201)
    })

    it('should return 400 when name is not provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest,
                name: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when cnpj is not provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest,
                cnpj: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when cnpj is invalid', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest,
                cnpj: 'invalid-cnpj',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when password is not provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest,
                password: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when password is invalid', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest,
                password: faker.internet.password({
                    length: 5,
                }),
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if CreateRestaurantUseCase throws CnpjIsAlreadyInUseError', async () => {
        // arrange
        const { sut, createRestaurantUseCase } = makeSut()
        import.meta.jest
            .spyOn(createRestaurantUseCase, 'execute')
            .mockRejectedValueOnce(new CnpjAlreadyInUseError())

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 500 if CreateRestaurantUseCase throws', async () => {
        // arrange
        const { sut, createRestaurantUseCase } = makeSut()
        import.meta.jest
            .spyOn(createRestaurantUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(500)
    })

    it('should call CreateRestaurantUseCase with correct params', async () => {
        // arrange
        const { sut, createRestaurantUseCase } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            createRestaurantUseCase,
            'execute',
        )

        // act
        await sut.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
    })
})
