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

            if (!deletedRestaurant) {
                return restaurantNotFoundResponse()
            }

            return ok(deletedRestaurant)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
