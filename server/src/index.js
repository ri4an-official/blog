import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import { BASE_URL, CORS, PORT } from './config.js'
import postController from './controller/post.controller.js'
import errorHandler from './middleware/error.middleware.js'
import authRouter from './router/auth.router.js'
import createRouter from './router/create.router.js'

config()

const app = express()
	.use(cors(CORS))
	.use(express.json())
	.use(`${BASE_URL}/posts`, createRouter(postController))
	.use(`${BASE_URL}/oauth`, authRouter)
	.use(errorHandler)

const startApp = async () => {
	try {
		const text = `server started on http://localhost:${PORT}${BASE_URL}`
		app.listen(PORT, () => console.log(text))
	} catch (e) {
		console.log(e)
	} finally {
	}
}
startApp()
