import express from 'express'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import {
    usersRouter,
    restaurantsRouter,
    dishesRouter,
    reviewsRouter,
} from './routes/index.js'
import fs from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(cors())

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/restaurants', restaurantsRouter)
app.use('/api/dishes', dishesRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/uploads', express.static('uploads'))

const swaggerDocument = JSON.parse(
    fs.readFileSync(join(__dirname, '../docs/swagger.json'), 'utf-8'),
)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export { app }
