import {
    invalidIdResponse,
    ok,
    serverEror,
    checkIfIdIsValid,
} from '../helpers/index.js'

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
            return serverEror()
        }
    }
}
