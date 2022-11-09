const { body, validationResult, } = require("express-validator");
const bcrypt = require('bcrypt')
const users = require('../database/dbUsers.json');

module.exports = [

    body('username').notEmpty().withMessage('Campo obligatorio').bail().trim().isLength({ min: 6 }).withMessage('Debe tener al menos 6 caracteres').isAlphanumeric(),
    body('password').notEmpty().withMessage('Campo obligatorio').bail().trim().isLength({ min: 6 }).withMessage('Debe tener al menos 6 caracteres').isAlphanumeric()
    .custom((password, { req, res, next }) => users.find(user => {
        const { username } = req.body
        if (username == user.userName) {
            const check = bcrypt.compareSync(password, user.password)
            if (!check) {
                throw new Error('Contraseña inválida')
            }
            return true;
        }
    }))

]