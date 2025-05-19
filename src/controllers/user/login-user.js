import { ZodError } from 'zod'
import { loginSchema } from '../../schemas/index.js'
import {
    serverError,
    ok,
    badRequest,
    unauthorizedResponse,
    userNotFoundResponse,
} from '../helpers/index.js'
import { InvalidPasswordError } from '../../errors/errors.js'
import { UserNotFoundError } from '../../errors/user.js'

export class LoginUserController {
    constructor(loginUserUseCase) {
        this.loginUserUseCase = loginUserUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await loginSchema.parseAsync(params)

            const user = await this.loginUserUseCase.execute(
                params.email,
                params.password,
            )

            return ok(user)
        } catch (error) {
            console.error(error)
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            if (error instanceof InvalidPasswordError) {
                return unauthorizedResponse()
            }
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }
            return serverError()
        }
    }
}
