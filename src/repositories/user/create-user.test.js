import { user } from '../../tests/index.js'
import { PostgresCreateUserRepository } from './create-user.js'

describe('Create User Repository', () => {
    it('should create user on db', async () => {
        const sut = new PostgresCreateUserRepository()

        const result = await sut.execute(user)

        expect(result.id).toBe(user.id)
        expect(result.name).toBe(user.name)
        expect(result.email).toBe(user.email)
        expect(result.password).toBe(user.password)
    })
})
