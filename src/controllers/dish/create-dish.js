import {
    serverError,
    created,
    badRequest,
    imageIsRequiredResponse,
    unsupportedMediaTypeResponse,
    restaurantNotFoundResponse,
} from '../helpers/index.js'
import { createDishSchema } from '../../schemas/dish.js'
import {
    RestaurantNotFoundError,
    UnsupportedFileTypeError,
} from '../../errors/index.js'
import { ZodError } from 'zod'

export class CreateDishController {
    constructor(createDishUseCase) {
        this.createDishUseCase = createDishUseCase
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

            await createDishSchema.parseAsync({
                ...params,
                image_url: params.imageFilename,
            })

            const dish = await this.createDishUseCase.execute(params)

            return created(dish)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            if (error instanceof UnsupportedFileTypeError) {
                return unsupportedMediaTypeResponse()
            }
            if (error instanceof RestaurantNotFoundError) {
                return restaurantNotFoundResponse()
            }
            console.error(error)
            return serverError()
        }
    }
}
