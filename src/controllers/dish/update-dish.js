import {
    checkIfIdIsValid,
    serverError,
    ok,
    invalidIdResponse,
    badRequest,
    dishNotFoundResponse,
    forbiddenResponse,
    unsupportedMediaTypeResponse,
} from '../helpers/index.js'
import { updateDishSchema } from '../../schemas/dish.js'
import { ZodError } from 'zod'
import {
    DishNotFoundError,
    ForbiddenError,
    UnsupportedFileTypeError,
} from '../../errors/index.js'

export class UpdateDishController {
    constructor(updateDishUseCase) {
        this.updateDishUseCase = updateDishUseCase
    }

    async execute(httpRequest) {
        try {
            const dishIdIsValid = checkIfIdIsValid(httpRequest.params.dishId)

            if (!dishIdIsValid) {
                return invalidIdResponse()
            }

            const params = {
                ...httpRequest.body,
            }

            if (httpRequest.file) {
                params.imageFilename = httpRequest.file.filename
            }

            await updateDishSchema.parseAsync(params)

            const updatedDish = await this.updateDishUseCase.execute(
                httpRequest.params.dishId,
                params,
            )

            return ok(updatedDish)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            if (error instanceof ForbiddenError) {
                return forbiddenResponse()
            }
            if (error instanceof UnsupportedFileTypeError) {
                return unsupportedMediaTypeResponse()
            }
            if (error instanceof DishNotFoundError) {
                return dishNotFoundResponse()
            }
            console.error(error)
            return serverError()
        }
    }
}
