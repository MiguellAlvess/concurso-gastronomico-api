import { notFound } from './index.js'

export const reviewNotFoundResponse = () =>
    notFound({
        message: 'Review not found',
    })
