const Joi = require('@hapi/joi');

const ProductValidation = Joi.object({
    token: Joi.string()
        .max(1024)
        .required(),

    name: Joi.string()
        .max(255)
        .required(),

    price: Joi.number()
        .max(255)
        .required(),

    image: Joi.string()
        .max(1024)
        .required()
})

module.exports = ProductValidation