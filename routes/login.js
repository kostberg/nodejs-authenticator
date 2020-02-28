const router = require('express').Router()
const users = require('../mongoose/models/User.model')
const validateHash = require('../methods/validateHash')
const isDuplicate = require('../mongoose/isDuplicate')
const validateUser = require('../methods/validateLogin')


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
            ValidationError: err["details"][0]["message"]
        })
        return
    }

    // Check if username already exists
    duplicate = await isDuplicate(username).catch(err => console.log(err))
    if (!duplicate) {
        res.json({
            error: "User doesn't exist"
        })
        return
    }
    // If user exists then grab the hashed password
    const hash = await users.findOne({
        username
    })

    // Compare password with hash
    validateHash(password, hash.passwordHash).then(() => {
        res.status(200).json("Logged in!")
    })
})

module.exports = router