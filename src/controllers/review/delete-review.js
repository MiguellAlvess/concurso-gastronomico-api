import {
    serverError,
    ok,
    invalidIdResponse,
    checkIfIdIsValid,
    reviewNotFoundResponse,
    forbiddenResponse,
} from '../helpers/index.js'
import { ReviewNotFoundError, ForbiddenError } from '../../errors/index.js'

export class DeleteReviewController {
    constructor(deleteReviewUseCase) {
        this.deleteReviewUseCase = deleteReviewUseCase
    }

    async execute(httpRequest) {
        try {
            const reviewId = httpRequest.params.reviewId
            const userId = httpRequest.userId

            const reviewIdIsValid = checkIfIdIsValid(reviewId)

            if (!reviewIdIsValid) {
                return invalidIdResponse()
            }

            const deletedReview = await this.deleteReviewUseCase.execute(
                reviewId,
                userId,
            )

            return ok(deletedReview)
        } catch (error) {
            console.error(error)
            if (error instanceof ReviewNotFoundError) {
                return reviewNotFoundResponse()
            }
            if (error instanceof ForbiddenError) {
                return forbiddenResponse()
            }

            return serverError()
        }
    }
}
