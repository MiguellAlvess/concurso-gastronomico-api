export class GetDishByIdUseCase {
    constructor(getDishByIdUseCase) {
        this.getDishByIdUseCase = getDishByIdUseCase
    }

    async execute(dishId) {
        const user = await this.getDishByIdUseCase.execute(dishId)

        return user
    }
}
