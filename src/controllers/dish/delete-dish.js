import {
    serverError,
    invalidIdResponse,
    ok,
    checkIfIdIsValid,
    dishNotFoundResponse,
    forbiddenResponse,
} from '../../controllers/helpers/index.js'
import { DishNotFoundError, ForbiddenError } from '../../errors/index.js'

export class DeleteDishController {
    constructor(deleteDishUseCase) {
        this.deleteDishUseCase = deleteDishUseCase
    }

    async execute(httpRequest) {
        try {
            const dishId = httpRequest.params.dishId
            const restaurantId = httpRequest.restaurantId

            const dishIdIsValid = checkIfIdIsValid(dishId)
            const restaurantIdIsValid = checkIfIdIsValid(restaurantId)

            if (!dishIdIsValid || !restaurantIdIsValid) {
                return invalidIdResponse()
            }

            const deletedDish = await this.deleteDishUseCase.execute(
                dishId,
                restaurantId,
            )

            return ok(deletedDish)
        } catch (error) {
            console.error(error)
            if (error instanceof DishNotFoundError) {
                return dishNotFoundResponse()
            }
            if (error instanceof ForbiddenError) {
                return forbiddenResponse()
            }
            return serverError()
        }
    }
}
