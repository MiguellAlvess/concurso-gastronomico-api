import {
    CnpjAlreadyInUseError,
    ImageIsRequiredError,
} from '../../errors/index.js'

export class CreateRestaurantUseCase {
    constructor(
        getRestaurantByCnpjRepository,
        createRestaurantRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
        tokensGeneratorRestaurantAdapter,
    ) {
        this.getRestaurantByCnpjRepository = getRestaurantByCnpjRepository
        this.createRestaurantRepository = createRestaurantRepository
        this.passwordHasherAdapter = passwordHasherAdapter
        this.idGeneratorAdapter = idGeneratorAdapter
        this.tokensGeneratorRestaurantAdapter = tokensGeneratorRestaurantAdapter
    }

    async execute(createRestaurantParams) {
        const { imageFilename, cnpj, name, password } = createRestaurantParams

        if (!imageFilename) {
            throw new ImageIsRequiredError()
        }

        const restaurantWithProvidedCnpj =
            await this.getRestaurantByCnpjRepository.execute(cnpj)

        if (restaurantWithProvidedCnpj) {
            throw new CnpjAlreadyInUseError(cnpj)
        }

        const restaurantId = this.idGeneratorAdapter.execute()
        const hashedPassword =
            await this.passwordHasherAdapter.execute(password)

        const imageUrl = `/uploads/${imageFilename}`

        const restaurant = {
            id: restaurantId,
            cnpj,
            name,
            password: hashedPassword,
            image_url: imageUrl,
        }

        const createdRestaurant =
            await this.createRestaurantRepository.execute(restaurant)

        return {
            ...createdRestaurant,
            tokens: this.tokensGeneratorRestaurantAdapter.execute(
                createdRestaurant.id,
            ),
        }
    }
}
