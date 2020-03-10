const Joi = require('@hapi/joi');

const TokenValidation = Joi.object({
    token: Joi.string()
        .max(1024)
        .required()
})

module.exports = TokenValidation