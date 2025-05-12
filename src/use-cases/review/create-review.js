import { UserNotFoundError } from '../../errors/user.js'

export class CreateReviewUseCase {
    constructor(
        createReviewRepository,
        getUserByIdRepository,
        idGeneratorAdapter,
    ) {
        this.createReviewRepository = createReviewRepository
        this.getUserByIdRepository = getUserByIdRepository
        this.idGeneratorAdapter = idGeneratorAdapter
    }

    async execute(createReviewParams) {
        const userId = createReviewParams.user_id

        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const reviewId = this.idGeneratorAdapter.execute()

        const review = await this.createReviewRepository.execute({
            ...createReviewParams,
            id: reviewId,
        })

        return review
    }
}
