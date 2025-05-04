import { z } from 'zod'
import validator from 'validator'

export const createDishSchema = z.object({
    restaurant_id: z
        .string({
            required_error: 'Restaurant id is required',
        })
        .uuid({
            message: 'Restaurant id must be a valid uuid',
        }),
    name: z
        .string({
            required_error: 'Name is required',
        })
        .min(1, {
            message: 'Name is required',
        }),
    details: z
        .string({
            required_error: 'Details are required',
        })
        .min(1, {
            message: 'Details are required',
        }),
    price: z
        .number({
            required_error: 'Price is required',
            invalid_type_error: 'Amount must be a number',
        })
        .min(1, {
            message: 'Price must be at least R$ 1',
        })
        .refine((value) =>
            validator.isCurrency(value.toFixed(2), {
                digits_after_decimal: [2],
                allow_negatives: false,
                decimal_separator: '.',
            }),
        ),
})
