import { Router } from 'express'
import {
    makeCreateDishController,
    makeGetDishesByRestaurantIdController,
    makeUpdateDishController,
    makeDeleteDishController,
    makeGetDishByIdController,
} from '../factories/controllers/dish.js'
import { auth } from '../middlewares/auth.js'

export const dishesRouter = Router()

dishesRouter.get('/:dishId', auth, async (req, res) => {
    const getDishByIdController = makeGetDishByIdController()

    const { statusCode, body } = await getDishByIdController.execute(req)

    res.status(statusCode).send(body)
})

dishesRouter.get('/', auth, async (req, res) => {
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

dishesRouter.post('/', auth, async (req, res) => {
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

dishesRouter.patch('/:dishId', auth, async (req, res) => {
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

dishesRouter.delete('/:dishId', auth, async (req, res) => {
    const deleteDishController = makeDeleteDishController()

    const { statusCode, body } = await deleteDishController.execute({
        ...req,
        params: {
            dishId: req.dishId,
            restaurant_id: req.restaurantId,
        },
    })

    res.status(statusCode).json(body)
})
