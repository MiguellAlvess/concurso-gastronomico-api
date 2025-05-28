import { LoginUserUseCase } from './login-user.js'
import { user } from '../../tests/index.js'
import { UserNotFoundError } from '../../errors/index.js'

describe('Login User Use Case', () => {
    class GetUserByEmailRepositoryStub {
        async execute() {
            return user
        }
    }

    class PasswordComparatorAdapterStub {
        execute() {
            return true
        }
    }

    class TokensGeneratorUserAdapterStub {
        execute() {
            return {
                acessToken: 'any_token',
                refreshToken: 'any_token',
            }
        }
    }

    const makeSut = () => {
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub()
        const passwordComparatorAdapter = new PasswordComparatorAdapterStub()
        const tokensGeneratorUserAdapter = new TokensGeneratorUserAdapterStub()
        const sut = new LoginUserUseCase(
            getUserByEmailRepository,
            passwordComparatorAdapter,
            tokensGeneratorUserAdapter,
        )

        return {
            sut,
            getUserByEmailRepository,
            passwordComparatorAdapter,
            tokensGeneratorUserAdapter,
        }
    }

    it('should return user with tokens', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(user.email, user.password)

        expect(result.tokens.acessToken).toBe('any_token')
    })

    it('should throw UserNotFoundError if user is not found', async () => {
        const { sut, getUserByEmailRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByEmailRepository, 'execute')
            .mockResolvedValueOnce(null)

        const promise = sut.execute(user.email, user.password)

        await expect(promise).rejects.toThrow(new UserNotFoundError())
    })
})
