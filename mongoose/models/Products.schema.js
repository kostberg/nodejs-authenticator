const mongoose = require('mongoose')

const Products = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 255
    },
    price: {
        type: Number,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    image: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    }
})

module.exports = Products