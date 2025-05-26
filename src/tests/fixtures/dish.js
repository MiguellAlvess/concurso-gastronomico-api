import { faker } from '@faker-js/faker'

export const dish = {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    details: faker.commerce.productDescription().slice(0, 255),
    price: Number(faker.finance.amount()),
    restaurant_id: faker.string.uuid(),
    image_url: faker.image.urlLoremFlickr(),
}
