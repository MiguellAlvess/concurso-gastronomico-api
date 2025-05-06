import { UserNotFoundError } from '../../errors/user.js'
import {
    requiredFieldIsMissingResponse,
    serverError,
    userNotFoundResponse,
    ok,
    invalidIdResponse,
    checkIfIdIsValid,
} from '../helpers/index.js'

export class GetReviewsByUserIdController {
    constructor(getReviewsByUserIdUseCase) {
        this.getReviewsByUserIdUseCase = getReviewsByUserIdUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId

            if (!userId) {
                requiredFieldIsMissingResponse('userId')
            }

            const userIdIsValid = checkIfIdIsValid(userId)

            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            const reviews = await this.getReviewsByUserIdUseCase.execute(userId)

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
