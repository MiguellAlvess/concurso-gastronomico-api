import { PostgresCreateRestaurantRepository } from '../../repositories/index.js'
import { CreateRestaurantUseCase } from '../../use-cases/index.js'
import { CreateRestaurantController } from '../../controllers/index.js'

export const makeCreateRestaurantController = () => {
    const createRestaurantRepository = new PostgresCreateRestaurantRepository()

    const createRestaurantUseCase = new CreateRestaurantUseCase(
        createRestaurantRepository,
    )

    const createRestaurantController = new CreateRestaurantController(
        createRestaurantUseCase,
    )

    return createRestaurantController
}
