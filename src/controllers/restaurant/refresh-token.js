import { ZodError } from 'zod'
import {
    serverError,
    ok,
    badRequest,
    unauthorizedResponse,
} from '../helpers/index.js'
import { refreshTokenSchema } from '../../schemas/index.js'
import { UnauthorizedError } from '../../errors/index.js'

export class RefreshTokenRestaurantController {
    constructor(refreshTokenRestaurantUseCase) {
        this.refreshTokenRestaurantUseCase = refreshTokenRestaurantUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await refreshTokenSchema.parseAsync(params)

            const tokens = await this.refreshTokenRestaurantUseCase.execute(
                params.refreshToken,
            )

            return ok(tokens)
        } catch (error) {
            console.error(error)
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            if (error instanceof UnauthorizedError) {
                return unauthorizedResponse()
            }
            return serverError()
        }
    }
}
