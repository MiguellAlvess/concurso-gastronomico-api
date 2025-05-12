import { ZodError } from 'zod'
import {
    ok,
    serverError,
    badRequest,
    invalidIdResponse,
    checkIfIdIsValid,
    userNotFoundResponse,
} from '../helpers/index.js'

import { EmailAlreadyInUseError, UserNotFoundError } from '../../errors/user.js'
import { updateUserSchema } from '../../schemas/index.js'
export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const params = httpRequest.body

            await updateUserSchema.parseAsync(params)

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )

            return ok(updatedUser)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }

            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }

            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.log(error)
            return serverError()
        }
    }
}
