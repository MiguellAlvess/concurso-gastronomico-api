import z from 'zod'

export const refreshTokenSchema = z.object({
    refreshToken: z
        .string({
            required_error: 'Refresh token is required',
        })
        .trim()
        .min(1, {
            message: 'Refresh token is required',
        }),
})
