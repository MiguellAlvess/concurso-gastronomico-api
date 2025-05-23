import {
    UserNotFoundError,
    ReviewAlreadyExistsError,
    DishNotFoundError,
} from '../../errors/index.js'

export class CreateReviewUseCase {
    constructor(
        createReviewRepository,
        getUserByIdRepository,
        getDishByIdRepository,
        idGeneratorAdapter,
        checkUserReviewRepository,
    ) {
        this.createReviewRepository = createReviewRepository
        this.getUserByIdRepository = getUserByIdRepository
        this.getDishByIdRepository = getDishByIdRepository
        this.idGeneratorAdapter = idGeneratorAdapter
        this.checkUserReviewRepository = checkUserReviewRepository
    }

    async execute(createReviewParams) {
        const userId = createReviewParams.user_id
        const dishId = createReviewParams.dish_id

        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const dish = await this.getDishByIdRepository.execute(dishId)

        if (!dish) {
            throw new DishNotFoundError(dishId)
        }

        const existingReview = await this.checkUserReviewRepository.execute(
            userId,
            dishId,
        )

        if (existingReview) {
            throw new ReviewAlreadyExistsError()
        }

        const reviewId = this.idGeneratorAdapter.execute()

        const review = await this.createReviewRepository.execute({
            ...createReviewParams,
            id: reviewId,
        })

        return review
    }
}
