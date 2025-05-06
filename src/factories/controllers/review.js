import {
    PostgresCreateReviewRepository,
    PostgresGetUserByIdRepository,
    PostgresGetReviewsByUserIdRepository,
    PostgresGetDishByIdRepository,
    PostgresGetReviewsByDishIdRepository,
} from '../../repositories/index.js'
import {
    CreateReviewUseCase,
    GetReviewsByUserIdUseCase,
    GetReviewsByDishIdUseCase,
} from '../../use-cases/index.js'
import {
    CreateReviewController,
    GetReviewsByUserIdController,
    GetReviewsByDishIdController,
} from '../../controllers/index.js'

export const makeCreateReviewController = () => {
    const createReviewRepository = new PostgresCreateReviewRepository()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const createReviewUseCase = new CreateReviewUseCase(
        createReviewRepository,
        getUserByIdRepository,
    )
    const createReviewController = new CreateReviewController(
        createReviewUseCase,
    )
    return createReviewController
}

export const makeGetReviewsByUserIdController = () => {
    const getReviewsByUserIdRepository =
        new PostgresGetReviewsByUserIdRepository()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getReviewsByUserIdUseCase = new GetReviewsByUserIdUseCase(
        getReviewsByUserIdRepository,
        getUserByIdRepository,
    )
    const getReviewsByUserIdController = new GetReviewsByUserIdController(
        getReviewsByUserIdUseCase,
    )
    return getReviewsByUserIdController
}

export const makeGetReviewsByDishIdController = () => {
    const getReviewsByDishIdRepository =
        new PostgresGetReviewsByDishIdRepository()
    const getDishByIdRepository = new PostgresGetDishByIdRepository()

    const getReviewsByDishIdUseCase = new GetReviewsByDishIdUseCase(
        getReviewsByDishIdRepository,
        getDishByIdRepository,
    )
    const getReviewsByDishIdController = new GetReviewsByDishIdController(
        getReviewsByDishIdUseCase,
    )
    return getReviewsByDishIdController
}
