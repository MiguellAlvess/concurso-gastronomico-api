import {
    invalidIdResponse,
    checkIfIdIsValid,
    ok,
    restaurantNotFoundResponse,
    serverError,
} from '../helpers/index.js'

export class GetRestaurantByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase
    }

    async execute(htttpRequest) {
        try {
            const idIsValid = checkIfIdIsValid(htttpRequest.params.restaurantId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const restaurant = await this.getUserByIdUseCase.execute(
                htttpRequest.params.restaurantId,
            )

            if (!restaurant) {
                return restaurantNotFoundResponse()
            }

            return ok(restaurant)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
