import {
    invalidIdResponse,
    serverError,
    ok,
    requiredFieldIsMissingResponse,
    checkIfIdIsValid,
    restaurantNotFoundResponse,
} from '../helpers/index.js'
import { RestaurantNotFoundError } from '../../errors/restaurant.js'

export class GetDishesByRestaurantIdController {
    constructor(getDishesByRestaurantIdUseCase) {
        this.getDishesByRestaurantIdUseCase = getDishesByRestaurantIdUseCase
    }

    async execute(httpRequest) {
        try {
            const restaurantId = httpRequest.query.restaurantId

            if (!restaurantId) {
                return requiredFieldIsMissingResponse('restaurantId')
            }

            const restaurantIdIsValid = checkIfIdIsValid(restaurantId)

            if (!restaurantIdIsValid) {
                return invalidIdResponse()
            }

            const dishes =
                await this.getDishesByRestaurantIdUseCase.execute(restaurantId)

            return ok(dishes)
        } catch (error) {
            if (error instanceof RestaurantNotFoundError) {
                return restaurantNotFoundResponse()
            }
            console.error(error)
            return serverError()
        }
    }
}
