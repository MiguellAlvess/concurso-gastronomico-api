import { UserNotFoundError } from '../../errors/user.js'
import {
    requiredFieldIsMissingResponse,
    serverError,
    userNotFoundResponse,
    ok,
    invalidIdResponse,
    checkIfIdIsValid,
} from '../helpers/index.js'

export class GetUserReviewsController {
    constructor(getUserReviewsUseCase) {
        this.getUserReviewsUseCase = getUserReviewsUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId

            if (!userId) {
                return requiredFieldIsMissingResponse('userId')
            }

            const userIdIsValid = checkIfIdIsValid(userId)

            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            const reviews = await this.getUserReviewsUseCase.execute(userId)

            return ok(reviews)
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }
            console.error(error)
            return serverError()
        }
    }
}
