import {
    PostgresCreateRestaurantRepository,
    PostgresGetRestaurantByCnpjRepository,
} from '../../repositories/index.js'
import { CreateRestaurantUseCase } from '../../use-cases/index.js'
import { CreateRestaurantController } from '../../controllers/index.js'

export const makeCreateRestaurantController = () => {
    const getRestaurantByCnpjRepository =
        new PostgresGetRestaurantByCnpjRepository()
    const createRestaurantRepository = new PostgresCreateRestaurantRepository()

    const createRestaurantUseCase = new CreateRestaurantUseCase(
        getRestaurantByCnpjRepository,
        createRestaurantRepository,
    )

    const createRestaurantController = new CreateRestaurantController(
        createRestaurantUseCase,
    )

    return createRestaurantController
}
