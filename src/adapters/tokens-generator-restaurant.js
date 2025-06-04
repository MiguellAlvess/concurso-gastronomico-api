import jwt from 'jsonwebtoken'

export class TokensGeneratorRestaurantAdapter {
    execute(restaurantId) {
        return {
            accessToken: jwt.sign(
                { restaurantId },
                process.env.JWT_ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '15m',
                },
            ),
            refreshToken: jwt.sign(
                { restaurantId },
                process.env.JWT_REFRESH_TOKEN_SECRET,
                {
                    expiresIn: '7d',
                },
            ),
        }
    }
}
