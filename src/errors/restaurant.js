export class CnpjAlreadyInUseError extends Error {
    constructor(cnpj) {
        super(`The provided ${cnpj} is already in use`)
        this.name = 'CnpjAlreadyInUseError'
    }
}

export class RestaurantNotFoundError extends Error {
    constructor(restaurantId) {
        super(`Restaurant with id ${restaurantId} not found`)
        this.name = 'RestaurantNotFoundError'
    }
}
