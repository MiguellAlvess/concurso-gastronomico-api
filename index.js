import express from 'express'
import dotenv from 'dotenv'

import {
    makeCreateDishController,
    makeGetDishesByRestaurantIdController,
    makeUpdateDishController,
    makeDeleteDishController,
    makeGetDishByIdController,
} from './src/factories/controllers/dish.js'

import {
    makeCreateReviewController,
    makeGetReviewsByUserIdController,
    makeGetReviewsByDishIdController,
    makeDeleteReviewController,
} from './src/factories/controllers/review.js'

dotenv.config()

const app = express()

app.use(express.json())

app.get('/api/dishes/:dishId', async (req, res) => {
    const getDishByIdController = makeGetDishByIdController()

    const { statusCode, body } = await getDishByIdController.execute(req)

    res.status(statusCode).send(body)
})

app.get('/api/dishes', async (req, res) => {
    const getDishesByRestaurantIdController =
        makeGetDishesByRestaurantIdController()

    const { statusCode, body } =
        await getDishesByRestaurantIdController.execute(req)

    res.status(statusCode).send(body)
})

app.post('/api/dishes', async (req, res) => {
    const createDishController = makeCreateDishController()

    const { statusCode, body } = await createDishController.execute(req)

    res.status(statusCode).json(body)
})

app.patch('/api/dishes/:dishId', async (req, res) => {
    const updateDishController = makeUpdateDishController()

    const { statusCode, body } = await updateDishController.execute(req)

    res.status(statusCode).json(body)
})

app.delete('/api/dishes/:dishId', async (req, res) => {
    const deleteDishController = makeDeleteDishController()

    const { statusCode, body } = await deleteDishController.execute(req)

    res.status(statusCode).json(body)
})

app.get('/api/reviews/by-user', async (req, res) => {
    const getReviewsByUserIdController = makeGetReviewsByUserIdController()

    const { statusCode, body } = await getReviewsByUserIdController.execute(req)

    res.status(statusCode).send(body)
})

app.get('/api/reviews/by-dish', async (req, res) => {
    const getReviewsByDishIdController = makeGetReviewsByDishIdController()

    const { statusCode, body } = await getReviewsByDishIdController.execute(req)

    res.status(statusCode).send(body)
})

app.post('/api/reviews', async (req, res) => {
    const createReviewController = makeCreateReviewController()

    const { statusCode, body } = await createReviewController.execute(req)

    res.status(statusCode).json(body)
})

app.delete('/api/reviews/:reviewId', async (req, res) => {
    const deleteReviewController = makeDeleteReviewController()

    const { statusCode, body } = await deleteReviewController.execute(req)

    res.status(statusCode).json(body)
})

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`)
})
