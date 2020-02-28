const User = require('./models/User.model.js')
const mongoose = require('mongoose')

const insertUser = async (username, email, passwordHash) => {
    const user = new User({
        username,
        email,
        passwordHash
    });
    await user.save()
}

module.exports = insertUser