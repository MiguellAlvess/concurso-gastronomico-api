import { PostgresCreateUserRepository } from '../../repositories/index.js'
import { CreateUserUseCase } from '../../use-cases/index.js'
import { CreateUserController } from '../../controllers/index.js'

export const makeCreateUserController = () => {
    const createUserRepository = new PostgresCreateUserRepository()

    const createUserUseCase = new CreateUserUseCase(createUserRepository)

    const createUserController = new CreateUserController(createUserUseCase)

    return createUserController
}
