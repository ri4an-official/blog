import jwt from 'jsonwebtoken'

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
            if (!accessToken) throw ApiError.Unauth('Token expired')

            const user = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY)

            return {
                id: user.id,
                username: user.username,
            }
        } catch (e) {
            return null
        }
    }

    validateRefresh = (refreshToken) => {
        try {
            if (!refreshToken) throw ApiError.Unauth('Token expired')

            const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY)

            return {
                id: user.id,
                username: user.username,
            }
        } catch (e) {
            return null
        }
    }
}
export default new JwtService()
