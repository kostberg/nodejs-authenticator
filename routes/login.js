const router = require('express').Router()
const users = require('../mongoose/models/User.model')
const bcrypt = require('bcrypt');
const isDuplicate = require('../mongoose/isDuplicate')
const validateUser = require('../methods/validateLogin')
const jwt = require('jsonwebtoken')


router.get('/', (req, res) => {
    res.send('Api is live, make a post request')
})

router.post('/', async (req, res) => {
    const {
        password,
        username
    } = req.body

    // Validate input
    try {
        await validateUser.validateAsync({
            username,
            password
        });
    } catch (err) {
        res.json({
            error: err["details"][0]["message"]
        })
        return
    }

    // Check if username exists
    duplicate = await isDuplicate(username).catch(err => console.log(err))
    if (!duplicate) {
        res.status(400).json({
            error: "User doesn't exist"
        })
        return
    }

    // If user exists then grab the hashed password
    const user = await users.findOne({
        username
    })

    // Compare password with hash
    const validPwd = await bcrypt.compare(password, user.passwordHash)
    if(!validPwd) return res.status(400).json({error: "Invalid password"})

    // Generate and respond with JWT
    const token = jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET)
    res.status(200).json({token, error: false})
})

module.exports = router