import {
    PostgresCreateRestaurantRepository,
    PostgresGetRestaurantByCnpjRepository,
    PostgresGetRestaurantByIdRepository,
    PostgresUpdateRestaurantRepository,
    PostgresDeleteRestaurantRepository,
} from '../../repositories/index.js'
import {
    CreateRestaurantUseCase,
    GetRestaurantByIdUseCase,
    UpdateRestaurantUseCase,
    DeleteRestaurantUseCase,
    LoginRestaurantUseCase,
} from '../../use-cases/index.js'
import {
    CreateRestaurantController,
    GetRestaurantByIdController,
    UpdateRestaurantController,
    DeleteRestaurantController,
    LoginRestaurantController,
} from '../../controllers/index.js'
import {
    PasswordHasherAdapter,
    IdGeneratorAdapter,
    PasswordComparatorAdapter,
    TokensGeneratorRestaurantAdapter,
} from '../../adapters/index.js'

export const makeGetRestaurantByIdController = () => {
    const getRestaurantByIdRepository =
        new PostgresGetRestaurantByIdRepository()
    const getRestaurantByIdUseCase = new GetRestaurantByIdUseCase(
        getRestaurantByIdRepository,
    )
    const getRestaurantByIdController = new GetRestaurantByIdController(
        getRestaurantByIdUseCase,
    )
    return getRestaurantByIdController
}

export const makeCreateRestaurantController = () => {
    const getRestaurantByCnpjRepository =
        new PostgresGetRestaurantByCnpjRepository()
    const createRestaurantRepository = new PostgresCreateRestaurantRepository()
    const passwordHasherAdapter = new PasswordHasherAdapter()
    const idGeneratorAdapter = new IdGeneratorAdapter()

    const createRestaurantUseCase = new CreateRestaurantUseCase(
        getRestaurantByCnpjRepository,
        createRestaurantRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
    )

    const createRestaurantController = new CreateRestaurantController(
        createRestaurantUseCase,
    )

    return createRestaurantController
}

export const makeUpdateRestaurantController = () => {
    const getRestaurantByCnpjRepository =
        new PostgresGetRestaurantByCnpjRepository()
    const updateRestaurantRepository = new PostgresUpdateRestaurantRepository()
    const passwordHasherAdapter = new PasswordHasherAdapter()

    const updateRestaurantUseCase = new UpdateRestaurantUseCase(
        getRestaurantByCnpjRepository,
        updateRestaurantRepository,
        passwordHasherAdapter,
    )

    const updateRestaurantController = new UpdateRestaurantController(
        updateRestaurantUseCase,
    )

    return updateRestaurantController
}

export const makeDeleteRestaurantController = () => {
    const deleteRestaurantRepository = new PostgresDeleteRestaurantRepository()
    const deleteRestaurantUseCase = new DeleteRestaurantUseCase(
        deleteRestaurantRepository,
    )

    const deleteRestaurantController = new DeleteRestaurantController(
        deleteRestaurantUseCase,
    )

    return deleteRestaurantController
}

export const makeLoginRestaurantController = () => {
    const getRestaurantByCnpjRepository =
        new PostgresGetRestaurantByCnpjRepository()
    const passwordComparatorAdpater = new PasswordComparatorAdapter()
    const tokensGeneratatorRestaurantAdapter =
        new TokensGeneratorRestaurantAdapter()

    const loginRestaurantUseCase = new LoginRestaurantUseCase(
        getRestaurantByCnpjRepository,
        passwordComparatorAdpater,
        tokensGeneratatorRestaurantAdapter,
    )

    const loginRestaurantController = new LoginRestaurantController(
        loginRestaurantUseCase,
    )

    return loginRestaurantController
}
