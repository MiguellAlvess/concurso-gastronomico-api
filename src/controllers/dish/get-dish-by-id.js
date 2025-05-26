import {
    invalidIdResponse,
    ok,
    serverError,
    checkIfIdIsValid,
    dishNotFoundResponse,
} from '../helpers/index.js'
import { DishNotFoundError } from '../../errors/index.js'

export class GetDishByIdController {
    constructor(getDishByIdUseCase) {
        this.getDishByIdUseCase = getDishByIdUseCase
    }

    async execute(httpRequest) {
        try {
            const dishIdIsValid = checkIfIdIsValid(httpRequest.params.dishId)

            if (!dishIdIsValid) {
                return invalidIdResponse()
            }

            const dish = await this.getDishByIdUseCase.execute(
                httpRequest.params.dishId,
            )

            return ok(dish)
        } catch (error) {
            console.error(error)
            if (error instanceof DishNotFoundError) {
                return dishNotFoundResponse()
            }
            return serverError()
        }
    }
}
