import { faker } from '@faker-js/faker'
import supertest from 'supertest'
import { user } from '../tests/index.js'
import { app } from '../app.js'

describe('User Routes E2E Tests', () => {
    it('POST /api/users should return 201 when user is created', async () => {
        const response = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        expect(response.statusCode).toBe(201)
    })

    it('GET /api/users/me should return 200 if user is authenticated', async () => {
        const { body: createdUser } = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        const response = await supertest(app)
            .get('/api/users/me')
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(createdUser.id)
    })

    it('PATCH /api/users/me should return 200 when user authenticated is updated', async () => {
        const { body: createdUser } = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        const updateUserParams = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        const response = await supertest(app)
            .patch('/api/users/me')
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)
            .send(updateUserParams)

        expect(response.statusCode).toBe(200)
        expect(response.body.first_name).toBe(updateUserParams.first_name)
        expect(response.body.last_name).toBe(updateUserParams.last_name)
        expect(response.body.email).toBe(updateUserParams.email)
        expect(response.body.password).not.toBe(updateUserParams.password)
    })
})
