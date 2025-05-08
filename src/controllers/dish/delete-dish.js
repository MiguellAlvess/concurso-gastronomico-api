import {
    serverError,
    invalidIdResponse,
    ok,
    checkIfIdIsValid,
    dishNotFoundResponse,
} from '../../controllers/helpers/index.js'
import { DishNotFoundError } from '../../errors/dish.js'

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

            return ok(deletedDish)
        } catch (error) {
            if (error instanceof DishNotFoundError) {
                return dishNotFoundResponse()
            }
            console.error(error)
            return serverError()
        }
    }
}
