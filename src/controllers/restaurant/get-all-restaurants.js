import { ok, serverError } from '../helpers/index.js'

export class GetAllRestaurantsController {
    constructor(getAllRestaurantsUseCase) {
        this.getAllRestaurantsUseCase = getAllRestaurantsUseCase
    }

    async execute() {
        try {
            const allRestaurants = await this.getAllRestaurantsUseCase.execute()
            return ok(allRestaurants)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
