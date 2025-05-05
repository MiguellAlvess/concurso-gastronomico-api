export class UpdateDishUseCase {
    constructor(updateDishRepository) {
        this.updateDishRepository = updateDishRepository
    }

    async execute(dishId, params) {
        const dish = await this.updateDishRepository.execute(dishId, params)

        return dish
    }
}
