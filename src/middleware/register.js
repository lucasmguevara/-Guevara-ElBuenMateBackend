const { body } = require("express-validator")
const users = require('../database/dbUsers.json');

module.exports = [
    body('firstname').notEmpty().withMessage('Campo obligatorio').bail().isLength({ min: 1 }).withMessage('Debe tener al menos 1 caracter'),
    body('lastname').notEmpty().withMessage('Campo obligatorio').bail().isLength({ min: 1 }).withMessage('Debe tener al menos 1 caracter'),
    body('email').notEmpty().withMessage('Campo obligatorio').bail().isEmail(),
    body('userName').notEmpty().withMessage('Campo obligatorio').bail().isLength({ min: 6 }).withMessage('Debe tener al menos 6 caracteres'),
    body('password').notEmpty().withMessage('Campo obligatorio').bail().isLength({ min: 6 }).withMessage('Debe tener al menos 6 caracteres').isAlphanumeric(),
    body('passwordConfirm').notEmpty().withMessage('Campo obligatorio').bail().isLength({ min: 6 }).withMessage('Debe tener al menos 6 caracteres').isAlphanumeric()
    .custom(async(passwordConfirm, { req }) => {
        const password = req.body.password
        if (password !== passwordConfirm) {
            throw new Error('Las contraseñas no coinciden')
        }
    })
]