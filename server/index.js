import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { BASE_URL, CORS, PORT } from './config.js'
import authRouter from './router/auth.router.js'
import createRouter from './router/create.router.js'
import postController from './controller/post.controller.js'
import errorHandler from './middleware/error.middleware.js'

config()

const app = express()
	.use(cors(CORS))
	.use(express.json())
	.use(`${BASE_URL}/posts`, createRouter(postController))
	.use(`${BASE_URL}/oauth`, authRouter)
	.use(errorHandler)

const startApp = async () => {
	try {
		const initText = `server started on http://localhost:${PORT}${BASE_URL}`
		app.listen(PORT, () => console.log(initText))
	} catch (e) {
		console.log(e)
	} finally {
	}
}
startApp()
