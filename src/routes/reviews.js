import { Router } from 'express'
import {
    makeCreateReviewController,
    makeGetReviewsByDishIdController,
    makeDeleteReviewController,
} from '../factories/controllers/review.js'
import { auth } from '../middlewares/auth.js'

export const reviewsRouter = Router()

reviewsRouter.get('/by-dish', auth, async (req, res) => {
    const getReviewsByDishIdController = makeGetReviewsByDishIdController()

    const { statusCode, body } = await getReviewsByDishIdController.execute({
        ...req,
        query: {
            ...req.query,
        },
    })

    res.status(statusCode).send(body)
})

reviewsRouter.post('/', auth, async (req, res) => {
    const createReviewController = makeCreateReviewController()

    const { statusCode, body } = await createReviewController.execute({
        ...req,
        body: {
            ...req.body,
            user_id: req.userId,
        },
    })

    res.status(statusCode).json(body)
})

reviewsRouter.delete('/:reviewId', auth, async (req, res) => {
    const deleteReviewController = makeDeleteReviewController()

    const { statusCode, body } = await deleteReviewController.execute({
        ...req,
        userId: req.userId,
    })

    res.status(statusCode).json(body)
})
