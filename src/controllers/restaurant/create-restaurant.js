import { createRestaurantSchema } from '../../schemas/restaurant.js'
import {
    serverError,
    created,
    badRequest,
    conflict,
    imageIsRequiredResponse,
    unsupportedMediaTypeResponse,
} from '../helpers/index.js'
import { ZodError } from 'zod'
import {
    CnpjAlreadyInUseError,
    UnsupportedFileTypeError,
} from '../../errors/index.js'

export class CreateRestaurantController {
    constructor(createRestaurantUseCase) {
        this.createRestaurantUseCase = createRestaurantUseCase
    }

    async execute(httpRequest) {
        try {
            if (!httpRequest.file) {
                return imageIsRequiredResponse()
            }

            const params = {
                ...httpRequest.body,
                imageFilename: httpRequest.file.filename,
            }

            await createRestaurantSchema.parseAsync(params)

            const createdRestaurant =
                await this.createRestaurantUseCase.execute(params)

            return created(createdRestaurant)
        } catch (error) {
            if (error instanceof UnsupportedFileTypeError) {
                return unsupportedMediaTypeResponse()
            }
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            if (error instanceof CnpjAlreadyInUseError) {
                return conflict({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
