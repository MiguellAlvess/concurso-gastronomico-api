import { Router } from 'express'
import {
    makeCreateRestaurantController,
    makeGetRestaurantByIdController,
    makeUpdateRestaurantController,
    makeDeleteRestaurantController,
} from '../factories/controllers/restaurant.js'
import { auth } from '../middlewares/auth.js'

export const restaurantsRouter = Router()

restaurantsRouter.get('/:restaurantId', auth, async (req, res) => {
    const getRestaurantByIdController = makeGetRestaurantByIdController()

    const { statusCode, body } = await getRestaurantByIdController.execute(req)

    res.status(statusCode).send(body)
})

restaurantsRouter.post('/', async (req, res) => {
    const createRestaurantController = makeCreateRestaurantController()

    const { statusCode, body } = await createRestaurantController.execute(req)

    res.status(statusCode).json(body)
})

restaurantsRouter.patch('/:restaurantId', auth, async (req, res) => {
    const updateRestaurantController = makeUpdateRestaurantController()

    const { statusCode, body } = await updateRestaurantController.execute(req)

    res.status(statusCode).json(body)
})

restaurantsRouter.delete('/:restaurantId', auth, async (req, res) => {
    const deleteRestaurantController = makeDeleteRestaurantController()

    const { statusCode, body } = await deleteRestaurantController.execute(req)

    res.status(statusCode).json(body)
})
