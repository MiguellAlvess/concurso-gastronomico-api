import supertest from 'supertest'
import { app } from '../app.js'
import { restaurant, dish } from '../tests/index.js'
import { faker } from '@faker-js/faker'

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

    it('GET /api/dishes/:dishId should return 200 when fetching dishe successfully', async () => {
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

        const { body: createdDish } = await supertest(app)
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

        const response = await supertest(app)
            .get(`/api/dishes/${createdDish.id}`)
            .set(
                'Authorization',
                `Bearer ${createdRestaurant.tokens.accessToken}`,
            )

        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(createdDish.id)
    })

    it('GET /api/dishes/me should return 200 when fetching dishes successfully', async () => {
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

        const { body: createdDish } = await supertest(app)
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

        const response = await supertest(app)
            .get(`/api/dishes/?restaurant_id=${createdRestaurant.id}`)
            .set(
                'Authorization',
                `Bearer ${createdRestaurant.tokens.accessToken}`,
            )

        expect(response.statusCode).toBe(200)
        expect(response.body[0].id).toBe(createdDish.id)
    })

    it('PATCH /api/dishes/me/:dishId should return 200 when dish is updated', async () => {
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

        const { body: createdDish } = await supertest(app)
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

        const updateDishParams = {
            name: faker.lorem.word(),
        }

        const response = await supertest(app)
            .patch(`/api/dishes/me/${createdDish.id}`)
            .set(
                'Authorization',
                `Bearer ${createdRestaurant.tokens.accessToken}`,
            )
            .send(updateDishParams)

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toBe(updateDishParams.name)
    })
})
