import { Tokens } from '../config.js'
import pool from '../db.js'
import userService from '../service/user.service.js'

class PostController {
    create = async (req, res, next) => {
        try {
            await userService.isAuth(req.header(Tokens.Access))

            const { text, date, user_id } = req.body
            const query =
                'INSERT INTO post (text,date,user_id) VALUES ($1,$2,$3) RETURNING *'
            const result = await pool.query(query, [text, date, user_id])
            const post = result.rows[0]
            res.json(post)
        } catch (e) {
            next(e)
        }
    }

    getAll = async (req, res, next) => {
        try {
            await userService.isAuth(req.header(Tokens.Access))

            const query = 'SELECT * FROM post'
            const result = await pool.query(query)
            const posts = result.rows
            res.json(posts)
        } catch (e) {
            next(e)
        }
    }

    get = async (req, res, next) => {
        try {
            await userService.isAuth(req.header(Tokens.Access))

            const { id } = req.params
            const query = 'SELECT * FROM post WHERE id=$1'
            const result = await pool.query(query, [id])
            const post = result.rows[0]
            res.json(post)
        } catch (e) {
            next(e)
        }
    }

    update = async (req, res, next) => {
        try {
            await userService.isAuth(req.header(Tokens.Access))
        } catch (e) {
            next(e)
        }
    }

    delete = async (req, res, next) => {
        try {
            await userService.isAuth(req.header(Tokens.Access))
        } catch (e) {
            next(e)
        }
    }
}
export default new PostController()
