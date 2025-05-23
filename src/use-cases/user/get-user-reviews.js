import { UserNotFoundError } from '../../errors/user.js'

export class GetUserReviewsUseCase {
    constructor(getUserReviewsRepository, getUserByIdRepository) {
        this.getUserReviewsRepository = getUserReviewsRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(userId) {
        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const reviews = await this.getUserReviewsRepository.execute(userId)

        return reviews
    }
}
