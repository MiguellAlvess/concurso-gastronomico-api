import { Router } from 'express'
import {
    makeCreateReviewController,
    makeDeleteReviewController,
} from '../factories/controllers/review.js'
import { auth } from '../middlewares/auth.js'

export const reviewsRouter = Router()

reviewsRouter.post('/me/dishes/:dishId', auth, async (req, res) => {
    const createReviewController = makeCreateReviewController()

    const { statusCode, body } = await createReviewController.execute({
        ...req,
        body: {
            ...req.body,
            user_id: req.userId,
            dish_id: req.params.dishId,
        },
    })

    res.status(statusCode).json(body)
})

reviewsRouter.delete('/me/:reviewId', auth, async (req, res) => {
    const deleteReviewController = makeDeleteReviewController()

    const { statusCode, body } = await deleteReviewController.execute({
        ...req,
        userId: req.userId,
    })

    res.status(statusCode).json(body)
})
