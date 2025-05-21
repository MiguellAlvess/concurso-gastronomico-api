import { ForbiddenError, ReviewNotFoundError } from '../../errors/index.js'

export class DeleteReviewUseCase {
    constructor(deleteReviewRepository, getReviewByIdRepository) {
        this.deleteReviewRepository = deleteReviewRepository
        this.getReviewByIdRepository = getReviewByIdRepository
    }

    async execute(reviewId, userId) {
        const review = await this.getReviewByIdRepository.execute(reviewId)

        if (!review) {
            throw new ReviewNotFoundError(reviewId)
        }

        if (review.user_id !== userId) {
            throw new ForbiddenError()
        }
        const deletedReview =
            await this.deleteReviewRepository.execute(reviewId)

        return deletedReview
    }
}
