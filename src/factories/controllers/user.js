import {
    PostgresCreateUserRepository,
    PostgresGetUserByIdRepository,
    PostgresGetUserByEmailRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserReviewsRepository,
} from '../../repositories/index.js'
import {
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    LoginUserUseCase,
    RefreshTokenUserUseCase,
    GetUserReviewsUseCase,
} from '../../use-cases/index.js'
import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController,
    LoginUserController,
    RefreshTokenUserController,
    GetUserReviewsController,
} from '../../controllers/index.js'
import {
    IdGeneratorAdapter,
    PasswordComparatorAdapter,
    PasswordHasherAdapter,
    TokensGeneratorUserAdapter,
    TokenVerifierAdpater,
} from '../../adapters/index.js'

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    return getUserByIdController
}
export const makeCreateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()

    const createUserRepository = new PostgresCreateUserRepository()

    const passwordHasherAdapter = new PasswordHasherAdapter()

    const idGeneratorAdapter = new IdGeneratorAdapter()

    const tokensGeneratorUserAdapter = new TokensGeneratorUserAdapter()

    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
        tokensGeneratorUserAdapter,
    )

    const createUserController = new CreateUserController(createUserUseCase)

    return createUserController
}

export const makeUpdateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()

    const updateUserRepository = new PostgresUpdateUserRepository()

    const passwordHasherAdapter = new PasswordHasherAdapter()

    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEmailRepository,
        updateUserRepository,
        passwordHasherAdapter,
    )

    const updateUserController = new UpdateUserController(updateUserUseCase)

    return updateUserController
}

export const makeDeleteUserController = () => {
    const deleteUserRepository = new PostgresDeleteUserRepository()

    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)

    const deleteUserController = new DeleteUserController(deleteUserUseCase)

    return deleteUserController
}

export const makeLoginUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()

    const passwordComparatorAdapter = new PasswordComparatorAdapter()

    const tokensGeneratorUserAdapter = new TokensGeneratorUserAdapter()

    const loginUserUseCase = new LoginUserUseCase(
        getUserByEmailRepository,
        passwordComparatorAdapter,
        tokensGeneratorUserAdapter,
    )

    const loginUserController = new LoginUserController(loginUserUseCase)

    return loginUserController
}

export const makeRefreshTokenUserController = () => {
    const tokensGeneratorUserAdapter = new TokensGeneratorUserAdapter()
    const tokenVerifierAdapter = new TokenVerifierAdpater()

    const refreshTokenUserUseCase = new RefreshTokenUserUseCase(
        tokensGeneratorUserAdapter,
        tokenVerifierAdapter,
    )

    const refreshTokenUserController = new RefreshTokenUserController(
        refreshTokenUserUseCase,
    )

    return refreshTokenUserController
}

export const makeGetUserReviewsController = () => {
    const getUserReviewsRepository = new PostgresGetUserReviewsRepository()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserReviewsUseCase = new GetUserReviewsUseCase(
        getUserReviewsRepository,
        getUserByIdRepository,
    )

    const getUserReviewsController = new GetUserReviewsController(
        getUserReviewsUseCase,
    )

    return getUserReviewsController
}
