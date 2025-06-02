import supertest from 'supertest'
import { app } from '../app.js'
import { restaurant, user, dish, review } from '../tests/index.js'

describe('Dish Routes E2E Tests', () => {
    it('POST /api/reviews/me/dishes/:dishId should return 201 when review is created', async () => {
        const { body: createdUser } = await supertest(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

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
            .post(`/api/reviews/me/dishes/${createdDish.id}`)
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)
            .send({
                ...review,
                id: undefined,
                user_id: createdUser.id,
                dish_id: createdDish.id,
            })

        expect(response.statusCode).toBe(201)
    })
})
