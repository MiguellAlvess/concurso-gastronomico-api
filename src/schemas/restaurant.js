import { z } from 'zod'
import validator from 'validator'

export const createRestaurantSchema = z.object({
    cnpj: z
        .string({ required_error: 'CNPJ é obrigatório' })
        .trim()
        .refine(
            (cnpj) => /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/.test(cnpj),
            {
                message:
                    'Invalid format. Please use XX.XXX.XXX/XXXX-XX or 14 digits.',
            },
        )

        .refine((cnpj) => validator.isCNPJ(cnpj), {
            message: 'CNPJ invalid.',
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
