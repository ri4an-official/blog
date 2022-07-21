import pool from '../db.js'
import userService from '../service/user.service.js'

class UserController {
    register = async (req, res, next) => {
        try {
            const { username, password } = req.body
            const userData = await userService.register(username, password)

            res.header('X-Access', userData.accessToken)
            res.header('X-Refresh', userData.refreshToken)

            res.json(userData.user)
        } catch (e) {
            next(e)
        }
    }

    login = async (req, res, next) => {
        try {
            const { username, password } = req.body
            const userData = await userService.login(username, password)

            res.header('X-Access', userData.accessToken)
            res.header('X-Refresh', userData.refreshToken)

            res.json(userData.user)
        } catch (e) {
            next(e)
        }
    }

    check = async (req, res, next) => {
        try {
            const accessToken = req.header('X-Access')
            const user = await userService.check(accessToken)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }

    refresh = async (req, res, next) => {
        try {
            const refreshToken = req.header('X-Refresh')
            const userData = await userService.refresh(refreshToken)

            res.header('X-Access', userData.accessToken)
            res.header('X-Refresh', userData.refreshToken)

            res.json(userData.user)
        } catch (e) {
            next(e)
        }
    }

    logout = async (req, res, next) => {
        try {
            const accessToken = req.header('X-Access')
            const resp = await userService.logout(accessToken)
            res.json(resp)
        } catch (e) {
            next(e)
        }
    }
}
export default new UserController()
