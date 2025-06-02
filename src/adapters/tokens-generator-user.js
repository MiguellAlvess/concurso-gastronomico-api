import jwt from 'jsonwebtoken'

export class TokensGeneratorUserAdapter {
    execute(userId) {
        return {
            accessToken: jwt.sign(
                { userId },
                process.env.JWT_ACESS_TOKEN_SECRET,
                {
                    expiresIn: '15m',
                },
            ),
            refreshToken: jwt.sign(
                { userId },
                process.env.JWT_REFRESH_TOKEN_SECRET,
                {
                    expiresIn: '30d',
                },
            ),
        }
    }
}
