import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

export class CreateUserUseCase {
    constructor(createUserRepository) {
        this.createUserRepository = createUserRepository
    }
    async execute(createUserParams) {
        // validar se o email ja foi cadastrado
        // criar o ID do usuário
        const userId = uuid()
        // criptografar a senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)
        // inserir o usuário no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        const createdUser = await this.createUserRepository.execute(user)

        return createdUser
    }
}
