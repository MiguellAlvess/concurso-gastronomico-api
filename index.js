import express from 'express'
import dotenv from 'dotenv'
import {
    makeCreateUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
    makeDeleteUserController,
} from './src/factories/controllers/user.js'

import {
    makeCreateRestaurantController,
    makeGetRestaurantByIdController,
    makeUpdateRestaurantController,
    makeDeleteRestaurantController,
} from './src/factories/controllers/restaurant.js'

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
} from './src/factories/controllers/review.js'

dotenv.config()

const app = express()

app.use(express.json())

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = makeGetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute(req)

    res.status(statusCode).send(body)
})

app.post('/api/users', async (req, res) => {
    const createUserController = makeCreateUserController()

    const { statusCode, body } = await createUserController.execute(req)

    res.status(statusCode).json(body)
})

app.patch('/api/users/:userId', async (req, res) => {
    const updateUserController = makeUpdateUserController()

    const { statusCode, body } = await updateUserController.execute(req)

    res.status(statusCode).json(body)
})

app.delete('/api/users/:userId', async (req, res) => {
    const deleteUserController = makeDeleteUserController()

    const { statusCode, body } = await deleteUserController.execute(req)

    res.status(statusCode).json(body)
})

app.get('/api/restaurants/:restaurantId', async (req, res) => {
    const getRestaurantByIdController = makeGetRestaurantByIdController()

    const { statusCode, body } = await getRestaurantByIdController.execute(req)

    res.status(statusCode).send(body)
})

app.post('/api/restaurants', async (req, res) => {
    const createRestaurantController = makeCreateRestaurantController()

    const { statusCode, body } = await createRestaurantController.execute(req)

    res.status(statusCode).json(body)
})

app.patch('/api/restaurants/:restaurantId', async (req, res) => {
    const updateRestaurantController = makeUpdateRestaurantController()

    const { statusCode, body } = await updateRestaurantController.execute(req)

    res.status(statusCode).json(body)
})

app.delete('/api/restaurants/:restaurantId', async (req, res) => {
    const deleteRestaurantController = makeDeleteRestaurantController()

    const { statusCode, body } = await deleteRestaurantController.execute(req)

    res.status(statusCode).json(body)
})

app.get('/api/dishes', async (req, res) => {
    const getDishByIdController = makeGetDishByIdController

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

app.get('/api/reviews', async (req, res) => {
    const getReviewsByUserIdController = makeGetReviewsByUserIdController()

    const { statusCode, body } = await getReviewsByUserIdController.execute(req)

    res.status(statusCode).send(body)
})

app.get('/api/reviews', async (req, res) => {
    const getReviewsByDishIdController = makeGetReviewsByDishIdController()

    const { statusCode, body } = await getReviewsByDishIdController.execute(req)

    res.status(statusCode).send(body)
})

app.post('/api/reviews', async (req, res) => {
    const createReviewController = makeCreateReviewController()

    const { statusCode, body } = await createReviewController.execute(req)

    res.status(statusCode).json(body)
})

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`)
})
