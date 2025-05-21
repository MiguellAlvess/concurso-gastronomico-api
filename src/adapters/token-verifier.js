import jwt from 'jsonwebtoken'

export class TokenVerifierAdpater {
    execute(token, secret) {
        return jwt.verify(token, secret)
    }
}
