import supertest from 'supertest'
import { app } from '../app.js'
import { restaurant, dish } from '../tests/index.js'

describe('Dish Routes E2E Tests', () => {
    it('POST /api/dishes/me should return 201 when dish is created', async () => {
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
            .post('/api/dishes/me')
            .set(
                'Authorization',
                `Bearer ${createdRestaurant.tokens.accessToken}`,
            )
            .field('name', dish.name)
            .field('details', dish.details)
            .field('restaurant_id', createdRestaurant.id)
            .field('price', dish.price)
            .attach('image', Buffer.from('fake-image-dish'), 'imagetest.png')

        expect(response.statusCode).toBe(201)
    })
})
