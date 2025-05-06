import { createReviewSchema } from '../../schemas'
import { created, serverError, badRequest } from '../helpers/index.js'
import { ZodError } from 'zod'

export class CreateReviewController {
    constructor(createReviewUseCase) {
        this.createReviewUseCase = createReviewUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createReviewSchema.parseAsync(params)

            const review = await this.createReviewUseCase.execute(params)

            return created(review)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            console.error(error)
            return serverError()
        }
    }
}
