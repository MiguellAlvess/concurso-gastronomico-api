import { createRestaurantSchema } from '../../schemas/restaurant.js'
import { serverError, created, badRequest, conflict } from '../helpers/index.js'
import { ZodError } from 'zod'
import { CnpjAlreadyInUseError } from '../../errors/restaurant.js'

export class CreateRestaurantController {
    constructor(createRestaurantUseCase) {
        this.createRestaurantUseCase = createRestaurantUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createRestaurantSchema.parseAsync(params)

            const createdRestaurant =
                await this.createRestaurantUseCase.execute(params)

            return created(createdRestaurant)
        } catch (error) {
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
