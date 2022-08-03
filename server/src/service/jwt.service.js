import jwt from 'jsonwebtoken'
import ApiError from '../helper/api.error.js'

class JwtService {
    generateTokens = (payload) => {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
            expiresIn: '1m',
        })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
            expiresIn: '2m',
        })

        return { accessToken, refreshToken }
    }

    validateAccess = (accessToken) => {
        try {
            if (!accessToken) throw ApiError.Unauth('Token is empty')

            const user = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY)

            return {
                id: user.id,
                username: user.username,
            }
        } catch (e) {
            return { message: e.message }
        }
    }

    validateRefresh = (refreshToken) => {
        try {
            if (!refreshToken) throw ApiError.Unauth('Token is empty')

            const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY)

            return {
                id: user.id,
                username: user.username,
            }
        } catch (e) {
            return { message: e.message }
        }
    }
}
export default new JwtService()
