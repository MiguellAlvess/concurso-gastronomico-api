import { Router } from 'express'
import {
    makeCreateRestaurantController,
    makeGetRestaurantByIdController,
    makeUpdateRestaurantController,
    makeDeleteRestaurantController,
    makeLoginRestaurantController,
    makeRefreshTokenRestaurantController,
    makeGetAllRestaurantsController,
} from '../factories/controllers/restaurant.js'
import { auth, imageUpload } from '../middlewares/index.js'

export const restaurantsRouter = Router()

restaurantsRouter.get('/me', auth, async (req, res) => {
    const getRestaurantByIdController = makeGetRestaurantByIdController()

    const { statusCode, body } = await getRestaurantByIdController.execute({
        ...req,
        params: {
            restaurantId: req.restaurantId,
        },
    })

    res.status(statusCode).send(body)
})

restaurantsRouter.get('/', auth, async (req, res) => {
    const getAllRestaurantsController = makeGetAllRestaurantsController()

    const { statusCode, body } = await getAllRestaurantsController.execute(req)

    res.status(statusCode).send(body)
})

restaurantsRouter.post('/', imageUpload, async (req, res) => {
    const createRestaurantController = makeCreateRestaurantController()

    const { statusCode, body } = await createRestaurantController.execute(req)

    res.status(statusCode).json(body)
})

restaurantsRouter.patch('/me', imageUpload, auth, async (req, res) => {
    const updateRestaurantController = makeUpdateRestaurantController()

    const { statusCode, body } = await updateRestaurantController.execute({
        ...req,
        params: {
            restaurantId: req.restaurantId,
        },
    })

    res.status(statusCode).json(body)
})

restaurantsRouter.delete('/me', auth, async (req, res) => {
    const deleteRestaurantController = makeDeleteRestaurantController()

    const { statusCode, body } = await deleteRestaurantController.execute({
        ...req,
        params: {
            restaurantId: req.restaurantId,
        },
    })

    res.status(statusCode).json(body)
})

restaurantsRouter.post('/auth/login', async (req, res) => {
    const loginRestaurantController = makeLoginRestaurantController()

    const { statusCode, body } = await loginRestaurantController.execute(req)

    res.status(statusCode).json(body)
})

restaurantsRouter.post('/auth/refresh-token', async (req, res) => {
    const refreshTokenRestaurantController =
        makeRefreshTokenRestaurantController()

    const { statusCode, body } =
        await refreshTokenRestaurantController.execute(req)

    res.status(statusCode).json(body)
})
