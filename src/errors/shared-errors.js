export class InvalidPasswordError extends Error {
    constructor() {
        super('Invalid password')
        this.name = 'InvalidPasswordError'
    }
}

export class ForbiddenError extends Error {
    constructor() {
        super('Forbidden')
        this.name = 'ForbiddenError'
    }
}

export class UnauthorizedError extends Error {
    constructor() {
        super('Unauthorized')
        this.name = 'UnauthorizedError'
    }
}
