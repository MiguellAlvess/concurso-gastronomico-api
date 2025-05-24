import { z } from 'zod'
import { validateCNPJ } from '../controllers/helpers/index.js'

export const createRestaurantSchema = z.object({
    cnpj: z
        .string({ required_error: 'CNPJ é obrigatório' })
        .trim()
        .refine((cnpj) => validateCNPJ(cnpj), {
            message: 'CNPJ invalid',
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
    image_url: z
        .string({
            required_error: 'Image url is required',
        })
        .trim()
        .min(1, {
            message: 'Image url is required',
        }),
})

export const updateRestaurantSchema = createRestaurantSchema.partial().strict({
    message: 'Some provided field is not allowed',
})

export const loginRestaurantSchema = z.object({
    cnpj: z
        .string({ required_error: 'CNPJ é obrigatório' })
        .trim()
        .refine((cnpj) => validateCNPJ(cnpj), {
            message: 'CNPJ invalid',
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
