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

    it('DELETE /api/users/me should return 200 when user authenticated is deleted', async () => {
        const { body: createdUser } = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        const response = await supertest(app)
            .delete('/api/users/me')
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(createdUser.id)
    })

    it('POST /api/users should return 409 when the email provided is already in use', async () => {
        const { body: createdUser } = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        const response = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
                email: createdUser.email,
            })

        expect(response.statusCode).toBe(409)
    })

    it('POST /api/users should return 400 when the password provided is invalid', async () => {
        const response = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
                password: faker.internet.password({ length: 3 }),
            })

        expect(response.statusCode).toBe(400)
    })

    it('POST /api/users should return 400 when the email provided is invalid', async () => {
        const response = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
                email: 'invalid-email',
            })

        expect(response.statusCode).toBe(400)
    })

    it('PATCH /api/users/me should return 400 when the password provided is invalid', async () => {
        const { body: createdUser } = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        const updateUserParams = {
            first_name: faker.person.firstName(),
            password: faker.internet.password({ length: 3 }),
        }

        const response = await supertest(app)
            .patch('/api/users/me')
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)
            .send(updateUserParams)

        expect(response.statusCode).toBe(400)
    })

    it('PATCH /api/users/me should return 400 when the email provided is invalid', async () => {
        const { body: createdUser } = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        const updateUserParams = {
            email: 'invalid-email',
        }

        const response = await supertest(app)
            .patch('/api/users/me')
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)
            .send(updateUserParams)

        expect(response.statusCode).toBe(400)
    })

    it('PATCH /api/users/me should return 400 when the provided email is already in use', async () => {
        const { body: createdUser } = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        const { body: createdUser2 } = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
                email: 'email2@example.com',
            })

        const updateUserParams = {
            email: createdUser2.email,
        }

        const response = await supertest(app)
            .patch('/api/users/me')
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)
            .send(updateUserParams)

        expect(response.statusCode).toBe(409)
    })

    it('POST /api/users/auth/login should return 200 and tokens when user credentials are valid', async () => {
        const { body: createdUser } = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        const response = await supertest(app)
            .post('/api/users/auth/login')
            .send({
                email: createdUser.email,
                password: user.password,
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.tokens.accessToken).toBeDefined()
        expect(response.body.tokens.refreshToken).toBeDefined()
    })

    it('POST /api/users/auth/refresh-token should return 200 and new tokens when refresh token is valid', async () => {
        const { body: createdUser } = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        const response = await supertest(app)
            .post('/api/users/auth/refresh-token')
            .send({
                refreshToken: createdUser.tokens.refreshToken,
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.accessToken).toBeDefined()
        expect(response.body.refreshToken).toBeDefined()
    })
})
