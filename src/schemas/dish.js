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
        .string({
            required_error: 'Price is required',
            invalid_type_error: 'Price must be a string',
        })
        .refine(
            (value) =>
                validator.isCurrency(value, {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                }),
            {
                message:
                    'Price must be a valid currency format (exemple: 12.50)',
            },
        )
        .transform((value) => parseFloat(value)),
})
