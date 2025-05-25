import { Router } from 'express'
import {
    makeCreateDishController,
    makeGetDishesByRestaurantIdController,
    makeUpdateDishController,
    makeDeleteDishController,
    makeGetDishByIdController,
    makeGetDishReviewsController,
} from '../factories/controllers/dish.js'
import { auth, imageUpload } from '../middlewares/index.js'

export const dishesRouter = Router()

dishesRouter.get('/reviews', auth, async (req, res) => {
    const getDishReviewsController = makeGetDishReviewsController()

    const { statusCode, body } = await getDishReviewsController.execute({
        ...req,
        query: {
            ...req.query,
        },
    })

    res.status(statusCode).send(body)
})

dishesRouter.get('/:dishId', auth, async (req, res) => {
    const getDishByIdController = makeGetDishByIdController()

    const { statusCode, body } = await getDishByIdController.execute({
        ...req,
        restaurantId: req.restaurantId,
    })

    res.status(statusCode).send(body)
})

dishesRouter.get('/me', auth, async (req, res) => {
    const getDishesByRestaurantIdController =
        makeGetDishesByRestaurantIdController()

    const { statusCode, body } =
        await getDishesByRestaurantIdController.execute({
            ...req,
            query: {
                ...req.query,
                restaurantId: req.restaurantId,
            },
        })

    res.status(statusCode).send(body)
})

dishesRouter.post('/', imageUpload, auth, async (req, res) => {
    const createDishController = makeCreateDishController()

    const { statusCode, body } = await createDishController.execute({
        ...req,
        body: {
            ...req.body,
            restaurant_id: req.restaurantId,
        },
    })

    res.status(statusCode).json(body)
})

dishesRouter.patch('/me/:dishId', auth, async (req, res) => {
    const updateDishController = makeUpdateDishController()

    const { statusCode, body } = await updateDishController.execute({
        ...req,
        body: {
            ...req.body,
            restaurant_id: req.restaurantId,
        },
    })

    res.status(statusCode).json(body)
})

dishesRouter.delete('/me/:dishId', auth, async (req, res) => {
    const deleteDishController = makeDeleteDishController()

    const { statusCode, body } = await deleteDishController.execute({
        ...req,
        restaurantId: req.restaurantId,
    })

    res.status(statusCode).json(body)
})
