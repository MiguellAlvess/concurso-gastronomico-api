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
})
