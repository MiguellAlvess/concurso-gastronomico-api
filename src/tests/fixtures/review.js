import { faker } from '@faker-js/faker'

export const review = {
    id: faker.string.uuid(),
    user_id: faker.string.uuid(),
    dish_id: faker.string.uuid(),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.paragraph({ min: 1, max: 3 }),
}
