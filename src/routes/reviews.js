import { Router } from 'express'
import {
    makeCreateReviewController,
    makeGetReviewsByUserIdController,
    makeGetReviewsByDishIdController,
    makeDeleteReviewController,
} from '../factories/controllers/review.js'

export const reviewsRouter = Router()

reviewsRouter.get('/by-user', async (req, res) => {
    const getReviewsByUserIdController = makeGetReviewsByUserIdController()

    const { statusCode, body } = await getReviewsByUserIdController.execute(req)

    res.status(statusCode).send(body)
})

reviewsRouter.get('/by-dish', async (req, res) => {
    const getReviewsByDishIdController = makeGetReviewsByDishIdController()

    const { statusCode, body } = await getReviewsByDishIdController.execute(req)

    res.status(statusCode).send(body)
})

reviewsRouter.post('/', async (req, res) => {
    const createReviewController = makeCreateReviewController()

    const { statusCode, body } = await createReviewController.execute(req)

    res.status(statusCode).json(body)
})

reviewsRouter.delete('/:reviewId', async (req, res) => {
    const deleteReviewController = makeDeleteReviewController()

    const { statusCode, body } = await deleteReviewController.execute(req)

    res.status(statusCode).json(body)
})
