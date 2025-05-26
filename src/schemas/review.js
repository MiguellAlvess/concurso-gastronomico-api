import { z } from 'zod'

export const createReviewSchema = z.object({
    user_id: z
        .string({
            required_error: 'User id is required',
        })
        .uuid({
            message: 'User id must be a valid uuid',
        }),
    rating: z
        .number({
            required_error: 'Rating is required',
            invalid_type_error: 'Rating must be a number',
        })
        .min(1, {
            message: 'Rating must be at least 1',
        })
        .max(5, {
            message: 'Rating must be at most 5',
        }),
    comment: z
        .string({
            required_error: 'Details are required',
        })
        .min(1, {
            message: 'Details are required',
        }),
})
