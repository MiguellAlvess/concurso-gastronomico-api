import express from 'express'
import {
    usersRouter,
    restaurantsRouter,
    dishesRouter,
    reviewsRouter,
} from './routes/index.js'

const app = express()

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/restaurants', restaurantsRouter)
app.use('/api/dishes', dishesRouter)
app.use('/api/reviews', reviewsRouter)

export { app }
