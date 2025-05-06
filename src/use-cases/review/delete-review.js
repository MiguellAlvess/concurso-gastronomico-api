export class DeleteReviewUseCase {
    constructor(deleteReviewRepository) {
        this.deleteReviewRepository = deleteReviewRepository
    }

    async execute(reviewId) {
        const deletedReview =
            await this.deleteReviewRepository.execute(reviewId)

        return deletedReview
    }
}
