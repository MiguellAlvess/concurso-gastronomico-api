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

    it('GET /api/restaurants/me should return 200 if restaurant is authenticated', async () => {
        const { body: createdRestaurant } = await supertest(app)
            .post('/api/restaurants')
            .field('name', restaurant.name)
            .field('cnpj', restaurant.cnpj)
            .field('password', restaurant.password)
            .attach(
                'image',
                Buffer.from('fake-image-restaurant'),
                'imagetest.png',
            )

        const response = await supertest(app)
            .get('/api/restaurants/me')
            .set(
                'Authorization',
                `Bearer ${createdRestaurant.tokens.accessToken}`,
            )

        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(createdRestaurant.id)
    })
})
