import { z } from 'zod'
import { validateCNPJ } from '../controllers/helpers/index.js'

export const createRestaurantSchema = z.object({
    cnpj: z
        .string({ required_error: 'CNPJ is required' })
        .trim()
        .refine((cnpj) => validateCNPJ(cnpj), {
            message: 'CNPJ is invalid',
        }),
    name: z
        .string({
            required_error: 'Name is required',
        })
        .trim()
        .min(1, {
            message: 'Name is required',
        }),
    password: z
        .string({
            required_error: 'Password is required',
        })
        .trim()
        .min(6, {
            message: 'Password must be at least 6 characters',
        }),
    image_url: z.string().min(1, 'Image is required'),
})

export const updateRestaurantSchema = createRestaurantSchema.partial()

export const loginRestaurantSchema = z.object({
    cnpj: z
        .string({ required_error: 'CNPJ is required' })
        .trim()
        .refine((cnpj) => validateCNPJ(cnpj), {
            message: 'CNPJ is invalid',
        }),
    password: z
        .string({
            required_error: 'Password is required',
        })
        .trim()
        .min(6, {
            message: 'Password must be at least 6 characters',
        }),
})
