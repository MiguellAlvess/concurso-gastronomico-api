import { ZodError } from 'zod'
import {
    serverError,
    unauthorizedResponse,
    ok,
    badRequest,
} from '../helpers/index.js'
import { UnauthorizedError } from '../../errors/index.js'
import { refreshTokenSchema } from '../../schemas/shared-schemas.js'

export class RefreshTokenUserController {
    constructor(refreshTokenUserUseCase) {
        this.refreshTokenUserUseCase = refreshTokenUserUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await refreshTokenSchema.parseAsync(params)

            const tokens = await this.refreshTokenUserUseCase.execute(
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
