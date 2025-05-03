import {
    PostgresCreateRestaurantRepository,
    PostgresGetRestaurantByCnpjRepository,
    PostgresGetRestaurantByIdRepository,
    PostgresUpdateRestaurantRepository,
} from '../../repositories/index.js'
import {
    CreateRestaurantUseCase,
    GetRestaurantByIdUseCase,
    UpdateRestaurantUseCase,
} from '../../use-cases/index.js'
import {
    CreateRestaurantController,
    GetRestaurantByIdController,
    UpdateRestaurantController,
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

export const makeUpdateRestaurantController = () => {
    const getRestaurantByCnpjRepository =
        new PostgresGetRestaurantByCnpjRepository()
    const updateRestaurantRepository = new PostgresUpdateRestaurantRepository()

    const updateRestaurantUseCase = new UpdateRestaurantUseCase(
        getRestaurantByCnpjRepository,
        updateRestaurantRepository,
    )

    const updateRestaurantController = new UpdateRestaurantController(
        updateRestaurantUseCase,
    )

    return updateRestaurantController
}
