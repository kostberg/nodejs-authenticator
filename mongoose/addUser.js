const User = require('./models/User.model.js')
const mongoose = require('mongoose')

const insertUser = async (params) => {
    const { username, email, password } = params
    const user = new User({
        username,
        email,
        passwordHash: password
    });
    await user.save()
}

module.exports = insertUser