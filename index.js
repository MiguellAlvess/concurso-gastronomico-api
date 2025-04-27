import express from 'express'
import dotenv from 'dotenv'
import { makeCreateUserController } from './src/factories/controllers/user.js'

dotenv.config()

const app = express()

app.use(express.json())

app.post('/api/users', async (req, res) => {
    const createUserController = makeCreateUserController()

    const { statusCode, body } = await createUserController.execute(req)

    res.status(statusCode).json(body)
})

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`)
})
