import { ErrorType } from "../errors/errors.js"

export function errorsHandler(error, req, res, next) {
    let code = 500
    switch (error.name) {
        case ErrorType.INVALID_ARGUMENTS:
            code = 400
            break
        case ErrorType.NOT_FOUND:
            code = 404
            break
        default:
            code = 500
    }
    return res.status(code).json({ status: 'error', message: error.message })
}