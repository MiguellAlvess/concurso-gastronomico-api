import { RestaurantNotFoundError } from '../../errors/restaurant.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    restaurantNotFoundResponse,
    serverError,
} from '../helpers/index.js'

export class DeleteRestaurantController {
    constructor(deleteRestaurantUseCase) {
        this.deleteRestaurantUseCase = deleteRestaurantUseCase
    }

    async execute(httpRequest) {
        try {
            const restaurantId = httpRequest.params.restaurantId

            const isIdValid = checkIfIdIsValid(restaurantId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const deletedRestaurant =
                await this.deleteRestaurantUseCase.execute(restaurantId)

            return ok(deletedRestaurant)
        } catch (error) {
            if (error instanceof RestaurantNotFoundError) {
                return restaurantNotFoundResponse()
            }
            console.error(error)
            return serverError()
        }
    }
}
