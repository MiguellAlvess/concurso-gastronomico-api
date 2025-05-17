import express from 'express'
import dotenv from 'dotenv'

import {
    makeCreateReviewController,
    makeGetReviewsByUserIdController,
    makeGetReviewsByDishIdController,
    makeDeleteReviewController,
} from './src/factories/controllers/review.js'

dotenv.config()

const app = express()

app.use(express.json())

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
