import {
    PostgresCreateReviewRepository,
    PostgresGetUserByIdRepository,
} from '../../repositories/index.js'
import { CreateReviewUseCase } from '../../use-cases/index.js'
import { CreateReviewController } from '../../controllers/index.js'

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
