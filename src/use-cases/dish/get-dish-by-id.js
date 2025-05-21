export class GetDishByIdUseCase {
    constructor(getDishByIdRepository) {
        this.getDishByIdRepository = getDishByIdRepository
    }

    async execute(dishId) {
        const dish = await this.getDishByIdRepository.execute(dishId)

        return dish
    }
}
