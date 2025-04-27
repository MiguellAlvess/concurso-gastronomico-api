import { ok, serverError } from '../helpers/index.js'
import { createUserSchema } from '../schemas/index.js'

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createUserSchema.parseAsync(params)

            const createdUser = await this.createUserUseCase.execute(params)

            return ok(createdUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
