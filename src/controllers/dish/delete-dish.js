import {
    restaurantNotFoundResponse,
    serverError,
    invalidIdResponse,
    ok,
    checkIfIdIsValid,
} from '../../controllers/helpers/index.js'

export class DeleteDishController {
    constructor(deleteDishUseCase) {
        this.deleteDishUseCase = deleteDishUseCase
    }

    async execute(httpRequest) {
        try {
            const dishId = httpRequest.params.dishId

            const dishIdIsValid = checkIfIdIsValid(dishId)

            if (!dishIdIsValid) {
                return invalidIdResponse()
            }

            const deletedDish = await this.deleteDishUseCase.execute(dishId)

            if (!deletedDish) {
                restaurantNotFoundResponse()
            }

            return ok(deletedDish)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
