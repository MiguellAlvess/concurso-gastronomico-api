import validator from 'validator'
import { badRequest, forbidden, unauthorized } from './http.js'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const invalidIdResponse = () =>
    badRequest({
        message: 'The provided id is not valid',
    })

export const requiredFieldIsMissingResponse = (field) =>
    badRequest({
        message: `The field ${field} is required`,
    })

export const unauthorizedResponse = () =>
    unauthorized({
        message: 'Unauthorized',
    })

export const forbiddenResponse = () =>
    forbidden({
        message: 'Forbidden',
    })
