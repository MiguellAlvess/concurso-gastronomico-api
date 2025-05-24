import {
    serverError,
    badRequest,
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    restaurantNotFoundResponse,
    unsupportedMediaTypeResponse,
    conflict,
} from '../helpers/index.js'
import { ZodError } from 'zod'
import {
    CnpjAlreadyInUseError,
    RestaurantNotFoundError,
    UnsupportedFileTypeError,
} from '../../errors/index.js'
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

            const params = {
                ...httpRequest.body,
            }

            if (httpRequest.file) {
                params.imageFilename = httpRequest.file.filename
            }

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
            if (error instanceof UnsupportedFileTypeError) {
                return unsupportedMediaTypeResponse()
            }
            if (error instanceof CnpjAlreadyInUseError) {
                return conflict({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
