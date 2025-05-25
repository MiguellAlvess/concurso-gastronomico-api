import { ok, serverError } from '../helpers/index.js'

export class GetAllDishesController {
    constructor(getAllDishesUseCase) {
        this.getAllDishesUseCase = getAllDishesUseCase
    }

    async execute() {
        try {
            const allDishes = await this.getAllDishesUseCase.execute()
            return ok(allDishes)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
