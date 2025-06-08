import {
    serverError,
    dishNotFoundResponse,
    requiredFieldIsMissingResponse,
    ok,
    invalidIdResponse,
    checkIfIdIsValid,
} from '../helpers/index.js'
import { DishNotFoundError } from '../../errors/index.js'

export class GetDishReviewsController {
    constructor(getDishReviewsUseCase) {
        this.getDishReviewsUseCase = getDishReviewsUseCase
    }

    async execute(httpRequest) {
        try {
            const dishId = httpRequest.query.dishId

            if (!dishId) {
                return requiredFieldIsMissingResponse('dishId')
            }

            const dishIdIsValid = checkIfIdIsValid(dishId)

            if (!dishIdIsValid) {
                return invalidIdResponse()
            }

            const reviews = await this.getDishReviewsUseCase.execute(dishId)

            return ok(reviews)
        } catch (error) {
            if (error instanceof DishNotFoundError) {
                return dishNotFoundResponse()
            }
            console.error(error)
            return serverError()
        }
    }
}
