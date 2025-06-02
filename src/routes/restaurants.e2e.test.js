import supertest from 'supertest'
import { app } from '../app.js'
import { restaurant } from '../tests/index.js'
import { faker } from '@faker-js/faker'

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

    it('PATCH /api/restaurants/me should return 200 when restaurant authenticated is updated', async () => {
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

        const updateRestaurantParams = {
            name: faker.company.name(),
            cnpj: '40.947.067/0001-52',
            password: faker.internet.password(),
        }

        const response = await supertest(app)
            .patch('/api/restaurants/me')
            .set(
                'Authorization',
                `Bearer ${createdRestaurant.tokens.accessToken}`,
            )
            .send(updateRestaurantParams)

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toBe(updateRestaurantParams.name)
        expect(response.body.cnpj).toBe(updateRestaurantParams.cnpj)
        expect(response.body.password).not.toBe(updateRestaurantParams.password)
    })

    it('DELETE /api/restaurants/me should return 200 when restaurant authenticated is deleted', async () => {
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
            .delete('/api/restaurants/me')
            .set(
                'Authorization',
                `Bearer ${createdRestaurant.tokens.accessToken}`,
            )

        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(createdRestaurant.id)
    })

    it('POST /api/restaurants/auth/login should return 200 and tokens when user credentials are valid', async () => {
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
            .post('/api/restaurants/auth/login')
            .send({
                cnpj: createdRestaurant.cnpj,
                password: restaurant.password,
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.tokens.accessToken).toBeDefined()
        expect(response.body.tokens.refreshToken).toBeDefined()
    })

    it('POST /api/restaurants/auth/refresh-token should return 200 and new tokens when refresh token is valid', async () => {
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
            .post('/api/restaurants/auth/refresh-token')
            .send({
                refreshToken: createdRestaurant.tokens.refreshToken,
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.tokens.accessToken).toBeDefined()
        expect(response.body.tokens.refreshToken).toBeDefined()
    })

    it('POST /api/restaurants should return 409 when the provided cnpj is already in use', async () => {
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
            .post('/api/restaurants')
            .field('name', faker.company.name())
            .field('cnpj', createdRestaurant.cnpj)
            .field('password', faker.internet.password())
            .attach(
                'image',
                Buffer.from('fake-image-restaurant'),
                'imagetest.png',
            )

        expect(response.statusCode).toBe(409)
    })

    it('POST /api/restaurants should return 400 when the provided cnpj is invalid', async () => {
        const response = await supertest(app)
            .post('/api/restaurants')
            .field('name', restaurant.name)
            .field('cnpj', 'invalid-cnpj')
            .field('password', restaurant.password)
            .attach(
                'image',
                Buffer.from('fake-image-restaurant'),
                'imagetest.png',
            )

        expect(response.statusCode).toBe(400)
    })

    it('POST /api/restaurants should return 400 when the provided password is invalid', async () => {
        const response = await supertest(app)
            .post('/api/restaurants')
            .field('name', restaurant.name)
            .field('cnpj', restaurant.cnpj)
            .field('password', faker.internet.password({ length: 3 }))
            .attach(
                'image',
                Buffer.from('fake-image-restaurant'),
                'imagetest.png',
            )

        expect(response.statusCode).toBe(400)
    })

    it('PATCH /api/restaurants/me should return 400 when the provided password is invalid', async () => {
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

        const updateRestaurantParams = {
            name: faker.company.name(),
            password: faker.internet.password({ length: 3 }),
        }

        const response = await supertest(app)
            .patch('/api/restaurants/me')
            .set(
                'Authorization',
                `Bearer ${createdRestaurant.tokens.accessToken}`,
            )
            .send(updateRestaurantParams)

        expect(response.statusCode).toBe(400)
    })
})
