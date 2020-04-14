const { body, validationResult } = require('express-validator');

const userCreateRules = () => {
    return [
        body('username').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
        body('email').not().isEmpty().withMessage('cannot be empty'),
        body('email').isEmail().withMessage('must be a valid email address'),
        body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
        body('firstName').not().isEmpty().withMessage('cannot be empty'),
        body('lastName').not().isEmpty().withMessage('cannot be empty'),
    ]
}

const userAuthenticateRules = () => {
    return [
        body('username').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
        body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long')
    ]
}

const movieCreateRules = () => {
    return [
        body('title').not().isEmpty().withMessage('cannot be empty'),
        body('description').not().isEmpty().withMessage('cannot be empty'),
        body('runtime').not().isEmpty().withMessage('cannot be empty'),
        body('releaseYear').not().isEmpty().withMessage('cannot be empty')
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}

module.exports = {
    userCreateRules,
    userAuthenticateRules,
    movieCreateRules,
    validate
}