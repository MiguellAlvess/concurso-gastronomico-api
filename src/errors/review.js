export class ReviewNotFoundError extends Error {
    constructor(reviewId) {
        super(`Reviw with id ${reviewId} was not found`)
        this.name = 'ReviewNotFoundError'
    }
}
