import { notFound } from './index.js'

export const dishNotFoundResponse = () =>
    notFound({
        message: 'Dish not found',
    })
