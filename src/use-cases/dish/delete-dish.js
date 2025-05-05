export class DeleteDishUseCase {
    constructor(deleteDishRepository) {
        this.deleteDishRepository = deleteDishRepository
    }

    async execute(dishId) {
        const deletedDish = await this.deleteDishRepository.execute(dishId)

        return deletedDish
    }
}
