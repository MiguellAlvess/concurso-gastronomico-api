import {
    serverError,
    badRequest,
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    restaurantNotFoundResponse,
} from '../helpers/index.js'
import { ZodError } from 'zod'
import {
    CnpjAlreadyInUseError,
    RestaurantNotFoundError,
} from '../../errors/restaurant.js'
import { updateRestaurantSchema } from '../../schemas/restaurant.js'

export class UpdateRestaurantController {
    constructor(updateRestaurantUseCase) {
        this.updateRestaurantUseCase = updateRestaurantUseCase
    }

    async execute(httpRequest) {
        try {
            const restaurantId = httpRequest.params.restaurantId

            const idIsValid = checkIfIdIsValid(restaurantId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const params = httpRequest.body

            await updateRestaurantSchema.parseAsync(params)

            const updatedRestaurant =
                await this.updateRestaurantUseCase.execute(restaurantId, params)

            return ok(updatedRestaurant)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            if (error instanceof RestaurantNotFoundError) {
                return restaurantNotFoundResponse()
            }
            if (error instanceof CnpjAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
