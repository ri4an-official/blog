import { Status } from '../config.js'

class ApiError extends Error {
    status
    errors

    constructor(message, status, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static Unauth = (message = 'User is not auth') => {
        return new ApiError(message, Status.NOT_AUTH)
    }

    static BadRequest = (message, status, errors = []) => {
        return new ApiError(message, status, errors)
    }
}
export default ApiError
