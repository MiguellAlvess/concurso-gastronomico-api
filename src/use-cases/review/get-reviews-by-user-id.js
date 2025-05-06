import { UserNotFoundError } from '../../errors/user.js'

export class GetReviewByUserIdRepository {
    constructor(getReviewByUserIdRepository, getUserByIdRepository) {
        this.getReviewByUserIdRepository = getReviewByUserIdRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(userId) {
        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const reviews = await this.getReviewByUserIdRepository.execute(userId)

        return reviews
    }
}
