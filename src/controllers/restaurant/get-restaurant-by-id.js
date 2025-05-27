import {
    invalidIdResponse,
    checkIfIdIsValid,
    ok,
    restaurantNotFoundResponse,
    serverError,
} from '../helpers/index.js'
import { RestaurantNotFoundError } from '../../errors/index.js'

export class GetRestaurantByIdController {
    constructor(getRestaurantByIdUseCase) {
        this.getRestaurantByIdUseCase = getRestaurantByIdUseCase
    }

    async execute(htttpRequest) {
        try {
            const idIsValid = checkIfIdIsValid(htttpRequest.params.restaurantId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const restaurant = await this.getRestaurantByIdUseCase.execute(
                htttpRequest.params.restaurantId,
            )

            return ok(restaurant)
        } catch (error) {
            console.error(error)
            if (error instanceof RestaurantNotFoundError) {
                return restaurantNotFoundResponse()
            }
            return serverError()
        }
    }
}
