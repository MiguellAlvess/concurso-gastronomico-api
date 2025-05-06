import { UserNotFoundError } from '../../errors/user.js'
import { v4 as uuid } from 'uuid'

export class CreateReviewUseCase {
    constructor(createReviewRepository, getUserByIdRepository) {
        this.createReviewRepository = createReviewRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(createReviewParams) {
        const userId = createReviewParams.user_id

        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const reviewId = uuid()

        const review = await this.createReviewRepository.execute({
            ...createReviewParams,
            id: reviewId,
        })

        return review
    }
}
