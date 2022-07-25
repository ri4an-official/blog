import { Tokens } from '../config.js'
import postService from '../service/post.service.js'
import userService from '../service/user.service.js'

class PostController {
	create = async (req, res, next) => {
		try {
			await userService.verify(req.header(Tokens.Access))

			const { text, date, user_id } = req.body
			const post = await postService.create(text, date, user_id)

			res.json(post)
		} catch (e) {
			next(e)
		}
	}

	getAll = async (req, res, next) => {
		try {
			// await userService.verify(req.header(Tokens.Access))

			const posts = await postService.getAll()

			res.json(posts)
		} catch (e) {
			next(e)
		}
	}

	getUserPosts = async (req, res, next) => {
		try {
			await userService.verify(req.header(Tokens.Access))

			const { id } = req.params
			const posts = await postService.getUserPosts(id)

			res.json(posts)
		} catch (e) {
			next(e)
		}
	}

	get = async (req, res, next) => {
		try {
			await userService.verify(req.header(Tokens.Access))

			const { id } = req.params
			const post = await postService.get(id)

			res.json(post)
		} catch (e) {
			next(e)
		}
	}

	update = async (req, res, next) => {
		try {
			await userService.verify(req.header(Tokens.Access))

			const { id } = req.params
			const { text, date } = req.params
			const post = await postService.update(id, text, date)

			res.json(post)
		} catch (e) {
			next(e)
		}
	}

	delete = async (req, res, next) => {
		try {
			await userService.verify(req.header(Tokens.Access))
		} catch (e) {
			next(e)
		}
	}
}
export default new PostController()
