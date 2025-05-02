import { createRestaurantSchema } from '../../schemas/restaurant.js'
import { serverError, created, badRequest } from '../helpers/index.js'
import { ZodError } from 'zod'

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
            console.error(error)
            return serverError()
        }
    }
}
