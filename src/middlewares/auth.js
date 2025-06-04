import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    try {
        const accessToken = req.headers?.authorization?.split('Bearer ')[1]

        if (!accessToken) {
            return res.status(401).send({ message: 'Unauthorized' })
        }

        const decodedToken = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_TOKEN_SECRET,
        )

        if (!decodedToken) {
            return res.status(401).send({ message: 'Unauthorized' })
        }

        req.userId = decodedToken.userId
        req.restaurantId = decodedToken.restaurantId

        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({ message: 'Unauthorized' })
    }
}
