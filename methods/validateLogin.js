const Joi = require('@hapi/joi');

const UserValidation = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(6)
        .max(255)
        .required(),

    password: Joi.string()
        .min(6)
        .max(255)
        .required()
})

module.exports = UserValidation