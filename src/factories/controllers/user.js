import {
    PostgresCreateUserRepository,
    PostgresGetUserByIdRepository,
} from '../../repositories/index.js'
import { CreateUserUseCase, GetUserByIdUseCase } from '../../use-cases/index.js'
import {
    CreateUserController,
    GetUserByIdController,
} from '../../controllers/index.js'

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    return getUserByIdController
}
export const makeCreateUserController = () => {
    const createUserRepository = new PostgresCreateUserRepository()

    const createUserUseCase = new CreateUserUseCase(createUserRepository)

    const createUserController = new CreateUserController(createUserUseCase)

    return createUserController
}
