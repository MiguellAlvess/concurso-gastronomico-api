export class DishNotFoundError extends Error {
    constructor(dishId) {
        super(`Dish with id ${dishId} not found`)
        this.name = 'DishNotFoundError'
    }
}
