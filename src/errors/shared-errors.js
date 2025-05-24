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

export class ImageIsRequiredError extends Error {
    constructor() {
        super('Image is required')
        this.name = 'ImageIsRequiredError'
    }
}

export class UnsupportedFileTypeError extends Error {
    constructor() {
        super('Unsupported file type')
        this.name = 'UnsupportedFileTypeError'
    }
}
