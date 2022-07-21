import { Router } from 'express'
import userController from '../controller/user.controller.js'

const router = new Router()

router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/check', userController.check)
router.post('/refresh', userController.refresh)

router.post('/logout', userController.logout)

export default router
