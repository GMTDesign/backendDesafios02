export class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = ErrorType.NOT_FOUND
    }
}

export class InvalidArgumentsError extends Error {
    constructor(message) {
        super(message)
        this.name = ErrorType.INVALID_ARGUMENTS
    }
}

export const ErrorType = {
    NOT_FOUND: 'NOT FOUND',
    INVALID_ARGUMENTS: 'INVALID ARGUMENTS'
}