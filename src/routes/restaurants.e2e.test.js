import supertest from 'supertest'
import { app } from '../app.js'
import { restaurant } from '../tests/index.js'

describe('Restaurants Routes E2E Tests', () => {
    it('POST /api/restaurants should return 201 when restaurant is created', async () => {
        const response = await supertest(app)
            .post('/api/restaurants')
            .field('name', restaurant.name)
            .field('cnpj', restaurant.cnpj)
            .field('password', restaurant.password)
            .attach(
                'image',
                Buffer.from('fake-image-restaurant'),
                'imagetest.png',
            )

        expect(response.statusCode).toBe(201)
    })
})
