import {
    PostgresCreateRestaurantRepository,
    PostgresGetRestaurantByCnpjRepository,
    PostgresGetRestaurantByIdRepository,
} from '../../repositories/index.js'
import {
    CreateRestaurantUseCase,
    GetRestaurantByIdUseCase,
} from '../../use-cases/index.js'
import {
    CreateRestaurantController,
    GetRestaurantByIdController,
} from '../../controllers/index.js'

export const makeGetRestaurantByIdController = () => {
    const getRestaurantByIdRepository =
        new PostgresGetRestaurantByIdRepository()
    const getRestaurantByIdUseCase = new GetRestaurantByIdUseCase(
        getRestaurantByIdRepository,
    )
    const getRestaurantByIdController = new GetRestaurantByIdController(
        getRestaurantByIdUseCase,
    )
    return getRestaurantByIdController
}

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
