import { Status } from '../config.js'
import ApiError from './api.error.js'

const validate = ({ username, password }) => {
    const LEN = 4
    if (!username || !password)
        throw ApiError.BadRequest('Username or password is empty', Status.UNSET)

    if (username.length <= LEN)
        throw ApiError.BadRequest(`Username must be more ${LEN}`, Status.UNSET)

    if (password.length <= LEN)
        throw ApiError.BadRequest(`Password must be more ${LEN}`, Status.UNSET)
}
export default validate
