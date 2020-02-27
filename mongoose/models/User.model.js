const mongoose = require('mongoose')

const Products = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    isEnabled: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model("users", Products)