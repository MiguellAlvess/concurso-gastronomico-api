import { ZodError } from 'zod'
import { serverError, badRequest, created, conflict } from '../helpers/index.js'
import { createUserSchema } from '../../schemas/index.js'
import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createUserSchema.parseAsync(params)

            const createdUser = await this.createUserUseCase.execute(params)

            return created(createdUser)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            if (error instanceof EmailAlreadyInUseError) {
                return conflict({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
