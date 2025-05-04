import { serverError, created, badRequest } from '../helpers/index.js'
import { createDishSchema } from '../../schemas/dish.js'
import { ZodError } from 'zod'

export class CreateDishController {
    constructor(createDishUseCase) {
        this.createDishUseCase = createDishUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createDishSchema.parseAsync(params)

            const dish = await this.createDishUseCase.execute(params)

            return created(dish)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            console.error(error)
            return serverError()
        }
    }
}
