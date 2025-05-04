import {
    PostgresCreateDishRepository,
    PostgresGetRestaurantByIdRepository,
} from '../../repositories/index.js'

import { CreateDishUseCase } from '../../use-cases/index.js'

import { CreateDishController } from '../../controllers/index.js'

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
