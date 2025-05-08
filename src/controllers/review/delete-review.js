import {
    serverError,
    ok,
    invalidIdResponse,
    checkIfIdIsValid,
    reviewNotFoundResponse,
} from '../helpers/index.js'
import { ReviewNotFoundError } from '../../errors/review.js'

export class DeleteReviewController {
    constructor(deleteReviewUseCase) {
        this.deleteReviewUseCase = deleteReviewUseCase
    }

    async execute(httpRequest) {
        try {
            const dishId = httpRequest.params.reviewId

            const reviewIdIsValid = checkIfIdIsValid(dishId)

            if (!reviewIdIsValid) {
                return invalidIdResponse()
            }

            const deletedReview = await this.deleteReviewUseCase.execute(dishId)

            return ok(deletedReview)
        } catch (error) {
            if (error instanceof ReviewNotFoundError) {
                return reviewNotFoundResponse()
            }

            console.error(error)
            return serverError()
        }
    }
}
