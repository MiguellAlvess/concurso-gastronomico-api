import { DishNotFoundError } from '../../errors/dish.js'
import {
    ReviewAlreadyExistsError,
    UserNotFoundError,
} from '../../errors/user.js'
import { createReviewSchema } from '../../schemas/review.js'
import {
    created,
    serverError,
    badRequest,
    reviewAlreadyExistsResponse,
    userNotFoundResponse,
    dishNotFoundResponse,
} from '../helpers/index.js'
import { ZodError } from 'zod'

export class CreateReviewController {
    constructor(createReviewUseCase) {
        this.createReviewUseCase = createReviewUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createReviewSchema.parseAsync(params)

            const review = await this.createReviewUseCase.execute(params)

            return created(review)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }
            if (error instanceof DishNotFoundError) {
                return dishNotFoundResponse()
            }
            if (error instanceof ReviewAlreadyExistsError) {
                return reviewAlreadyExistsResponse()
            }
            console.error(error)
            return serverError()
        }
    }
}
