export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The provided ${email} is already in use`)
        this.name = 'EmailAlreadyInUseError'
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`User with id ${userId} not found`)
        this.name = 'UserNotFoundError'
    }
}

export class ReviewAlreadyExistsError extends Error {
    constructor() {
        super(`You have already reviewed this dish`)
        this.name = 'ReviewAlreadyExistsError'
    }
}
