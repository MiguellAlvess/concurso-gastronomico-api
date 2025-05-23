import {
    PostgresCreateReviewRepository,
    PostgresGetUserByIdRepository,
    PostgresDeleteReviewRepository,
    PostgresGetReviewByIdRepository,
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
