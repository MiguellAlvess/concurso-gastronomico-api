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
            .set('Authorization', `Bearer ${createdUser.tokens.acessToken}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(createdUser.id)
    })
})
