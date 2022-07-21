import { Router } from 'express'

const createRouter = (controller) => {
    const router = new Router()

    router.get('/', controller.getAll)
    router.get('/:id', controller.get)

    router.post('/', controller.create)

    router.put('/:id', controller.update)
    router.delete('/:id', controller.delete)

    return router
}
export default createRouter
