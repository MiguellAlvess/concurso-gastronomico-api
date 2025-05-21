import { ZodError } from 'zod'
import { loginRestaurantSchema } from '../../schemas/restaurant.js'
import {
    serverError,
    ok,
    badRequest,
    unauthorizedResponse,
    restaurantNotFoundResponse,
} from '../helpers/index.js'
import {
    InvalidPasswordError,
    RestaurantNotFoundError,
} from '../../errors/index.js'

export class LoginRestaurantController {
    constructor(loginRestaurantUseCase) {
        this.loginRestaurantUseCase = loginRestaurantUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await loginRestaurantSchema.parseAsync(params)

            const restaurant = await this.loginRestaurantUseCase.execute(
                params.cnpj,
                params.password,
            )

            return ok(restaurant)
        } catch (error) {
            console.error(error)
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            if (error instanceof InvalidPasswordError) {
                return unauthorizedResponse()
            }
            if (error instanceof RestaurantNotFoundError) {
                return restaurantNotFoundResponse()
            }
            return serverError()
        }
    }
}
