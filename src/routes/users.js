import { Router } from 'express'
import {
    makeCreateUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
    makeDeleteUserController,
    makeLoginUserController,
    makeRefreshTokenUserController,
} from '../factories/controllers/user.js'
import { auth } from '../middlewares/auth.js'

export const usersRouter = Router()

usersRouter.get('/', auth, async (req, res) => {
    const getUserByIdController = makeGetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute({
        ...req,
        params: { userId: req.userId },
    })

    res.status(statusCode).send(body)
})

usersRouter.post('/', async (req, res) => {
    const createUserController = makeCreateUserController()

    const { statusCode, body } = await createUserController.execute(req)

    res.status(statusCode).json(body)
})

usersRouter.patch('/', auth, async (req, res) => {
    const updateUserController = makeUpdateUserController()

    const { statusCode, body } = await updateUserController.execute({
        ...req,
        params: { userId: req.userId },
    })

    res.status(statusCode).json(body)
})

usersRouter.delete('/', auth, async (req, res) => {
    const deleteUserController = makeDeleteUserController()

    const { statusCode, body } = await deleteUserController.execute({
        ...req,
        params: { userId: req.userId },
    })

    res.status(statusCode).json(body)
})

usersRouter.post('/login', async (req, res) => {
    const loginUserController = makeLoginUserController()

    const { statusCode, body } = await loginUserController.execute(req)

    res.status(statusCode).json(body)
})

usersRouter.post('/refresh-token', async (req, res) => {
    const refreshTokenUserUseCase = makeRefreshTokenUserController()

    const { statusCode, body } = await refreshTokenUserUseCase.execute(req)

    res.status(statusCode).json(body)
})
