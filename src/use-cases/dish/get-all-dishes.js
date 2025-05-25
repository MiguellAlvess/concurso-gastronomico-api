export class GetAllDishesUseCase {
    constructor(getAllDishesRepository) {
        this.getAllDishesRepository = getAllDishesRepository
    }

    async execute() {
        const allDishes = await this.getAllDishesRepository.execute()

        return allDishes
    }
}
