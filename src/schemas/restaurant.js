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
})
