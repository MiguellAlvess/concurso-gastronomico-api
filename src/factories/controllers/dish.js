import {
    PostgresCreateDishRepository,
    PostgresGetRestaurantByIdRepository,
    PostgresGetDishesByRestaurantIdRepository,
} from '../../repositories/index.js'

import {
    CreateDishUseCase,
    GetDishesByRestaurantIdUseCase,
} from '../../use-cases/index.js'

import {
    CreateDishController,
    GetDishesByRestaurantIdController,
} from '../../controllers/index.js'

export const makeCreateDishController = () => {
    const createDishRepository = new PostgresCreateDishRepository()
    const getRestaurantByIdRepository =
        new PostgresGetRestaurantByIdRepository()
    const createDishUseCase = new CreateDishUseCase(
        createDishRepository,
        getRestaurantByIdRepository,
    )
    const createDishController = new CreateDishController(createDishUseCase)
    return createDishController
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
