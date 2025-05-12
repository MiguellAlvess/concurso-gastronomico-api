import {
    PostgresCreateReviewRepository,
    PostgresGetUserByIdRepository,
    PostgresGetReviewsByUserIdRepository,
    PostgresGetDishByIdRepository,
    PostgresGetReviewsByDishIdRepository,
    PostgresDeleteReviewRepository,
} from '../../repositories/index.js'
import {
    CreateReviewUseCase,
    GetReviewsByUserIdUseCase,
    GetReviewsByDishIdUseCase,
    DeleteReviewUseCase,
} from '../../use-cases/index.js'
import {
    CreateReviewController,
    GetReviewsByUserIdController,
    GetReviewsByDishIdController,
    DeleteReviewController,
} from '../../controllers/index.js'
import { IdGeneratorAdapter } from '../../adapters/index.js'

export const makeCreateReviewController = () => {
    const createReviewRepository = new PostgresCreateReviewRepository()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const idGeneratorAdapter = new IdGeneratorAdapter()
    const createReviewUseCase = new CreateReviewUseCase(
        createReviewRepository,
        getUserByIdRepository,
        idGeneratorAdapter,
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

export const makeDeleteReviewController = () => {
    const deleteReviewRepository = new PostgresDeleteReviewRepository()
    const deleteReviewUseCase = new DeleteReviewUseCase(deleteReviewRepository)
    const deleteReviewController = new DeleteReviewController(
        deleteReviewUseCase,
    )
    return deleteReviewController
}
