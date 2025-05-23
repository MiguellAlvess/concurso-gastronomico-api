import {
    PostgresCreateReviewRepository,
    PostgresGetUserByIdRepository,
    PostgresDeleteReviewRepository,
    PostgresGetReviewByIdRepository,
    PostgresCheckUserReviewRepository,
    PostgresGetDishByIdRepository,
} from '../../repositories/index.js'
import {
    CreateReviewUseCase,
    DeleteReviewUseCase,
} from '../../use-cases/index.js'
import {
    CreateReviewController,
    DeleteReviewController,
} from '../../controllers/index.js'
import { IdGeneratorAdapter } from '../../adapters/index.js'

export const makeCreateReviewController = () => {
    const createReviewRepository = new PostgresCreateReviewRepository()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getDishByIdRepository = new PostgresGetDishByIdRepository()
    const idGeneratorAdapter = new IdGeneratorAdapter()
    const checkUserReviewRepository = new PostgresCheckUserReviewRepository()
    const createReviewUseCase = new CreateReviewUseCase(
        createReviewRepository,
        getUserByIdRepository,
        getDishByIdRepository,
        idGeneratorAdapter,
        checkUserReviewRepository,
    )
    const createReviewController = new CreateReviewController(
        createReviewUseCase,
    )
    return createReviewController
}

export const makeDeleteReviewController = () => {
    const deleteReviewRepository = new PostgresDeleteReviewRepository()
    const getReviewByIdRepository = new PostgresGetReviewByIdRepository()
    const deleteReviewUseCase = new DeleteReviewUseCase(
        deleteReviewRepository,
        getReviewByIdRepository,
    )
    const deleteReviewController = new DeleteReviewController(
        deleteReviewUseCase,
    )
    return deleteReviewController
}
