import { dish } from '../../tests/index.js'
import { CreateDishController } from './create-dish.js'

describe('Create Dish Controller', () => {
    class CreateDishUseCaseStub {
        async execute() {
            return dish
        }
    }

    const makeSut = () => {
        const createDishUseCase = new CreateDishUseCaseStub()
        const sut = new CreateDishController(createDishUseCase)

        return {
            sut,
            createDishUseCase,
        }
    }

    const httpRequest = {
        body: {
            id: undefined,
            name: dish.name,
            price: dish.price,
            details: dish.details,
            image_url: dish.image_url,
            restaurant_id: dish.restaurant_id,
        },
        file: dish.file,
    }

    it('should return 201 when creating a dish successfully', async () => {
        const { sut } = makeSut()

        const response = await sut.execute(httpRequest)

        expect(response.statusCode).toBe(201)
    })

    it('should return 400 when name is not provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...httpRequest,
                name: undefined,
            },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when price is not provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...httpRequest,
                price: undefined,
            },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when details is not provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...httpRequest,
                details: undefined,
            },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when image file is not provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...httpRequest,
            },
            file: undefined,
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 500 when CreateDishUseCase throws', async () => {
        const { sut, createDishUseCase } = makeSut()
        import.meta.jest
            .spyOn(createDishUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(500)
    })

    it('should call CreateDishUseCase with correct params', async () => {
        const { sut, createDishUseCase } = makeSut()
        const executeSpy = import.meta.jest.spyOn(createDishUseCase, 'execute')

        await sut.execute(httpRequest)

        expect(executeSpy).toHaveBeenCalledWith({
            ...httpRequest.body,
            imageFilename: httpRequest.file.filename,
        })
    })
})
