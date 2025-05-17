import express from 'express'
import { usersRouter, restaurantsRouter } from './routes/index.js'

const app = express()

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/restaurants', restaurantsRouter)

export { app }
