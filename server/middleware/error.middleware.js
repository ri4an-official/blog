import { Status } from '../config.js'
import ApiError from '../helper/api.error.js'

export default function errorHandler(e, req, res, next) {
    if (e instanceof ApiError)
        return res.status(e.status).json({ message: e.message, errors: e.errors })

    console.log(e)
    return res.status(Status.SERVER_ERROR).json({ message: e.message })
}
