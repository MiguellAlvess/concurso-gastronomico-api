import supertest from 'supertest'
import { user } from '../tests/index.js'
import { app } from '../app.js'

describe('User Routes E2E Tests', () => {
    it('POST should return 201 when user is created', async () => {
        const response = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        expect(response.statusCode).toBe(201)
    })
})
