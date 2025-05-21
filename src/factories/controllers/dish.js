import {
    PostgresCreateDishRepository,
    PostgresGetRestaurantByIdRepository,
    PostgresGetDishesByRestaurantIdRepository,
    PostgresUpdateDishRepository,
    PostgresDeleteDishRepository,
    PostgresGetDishByIdRepository,
} from '../../repositories/index.js'

import {
    CreateDishUseCase,
    GetDishesByRestaurantIdUseCase,
    UpdateDishUseCase,
    DeleteDishUseCase,
    GetDishByIdUseCase,
} from '../../use-cases/index.js'

import {
    CreateDishController,
    GetDishesByRestaurantIdController,
    UpdateDishController,
    DeleteDishController,
    GetDishByIdController,
} from '../../controllers/index.js'
import { IdGeneratorAdapter } from '../../adapters/index.js'

export const makeCreateDishController = () => {
    const createDishRepository = new PostgresCreateDishRepository()
    const getRestaurantByIdRepository =
        new PostgresGetRestaurantByIdRepository()
    const idGeneratorAdapter = new IdGeneratorAdapter()
    const createDishUseCase = new CreateDishUseCase(
        createDishRepository,
        getRestaurantByIdRepository,
        idGeneratorAdapter,
    )
    const createDishController = new CreateDishController(createDishUseCase)
    return createDishController
}

export const makeGetDishByIdController = () => {
    const getDishByIdRepository = new PostgresGetDishByIdRepository()
    const getDishByIdUseCase = new GetDishByIdUseCase(getDishByIdRepository)
    const getDishByIdController = new GetDishByIdController(getDishByIdUseCase)
    return getDishByIdController
}

export const makeGetDishesByRestaurantIdController = () => {
    const getDishesByRestaurantIdRepository =
        new PostgresGetDishesByRestaurantIdRepository()

    const getRestaurantByIdRepository =
        new PostgresGetRestaurantByIdRepository()
    const getDishesByRestaurantIdUseCase = new GetDishesByRestaurantIdUseCase(
        getDishesByRestaurantIdRepository,
        getRestaurantByIdRepository,
    )
    const getDishesByRestaurantIdController =
        new GetDishesByRestaurantIdController(getDishesByRestaurantIdUseCase)
    return getDishesByRestaurantIdController
}

export const makeUpdateDishController = () => {
    const updateDishRepository = new PostgresUpdateDishRepository()
    const getDishByIdRepository = new PostgresGetDishByIdRepository()
    const updateDishUseCase = new UpdateDishUseCase(
        updateDishRepository,
        getDishByIdRepository,
    )
    const updateDishController = new UpdateDishController(updateDishUseCase)
    return updateDishController
}

export const makeDeleteDishController = () => {
    const deleteDishRepository = new PostgresDeleteDishRepository()
    const deleteDishUseCase = new DeleteDishUseCase(deleteDishRepository)
    const deleteDishController = new DeleteDishController(deleteDishUseCase)
    return deleteDishController
}
