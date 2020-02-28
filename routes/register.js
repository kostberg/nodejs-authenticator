const router = require('express').Router()
const insertUser = require('../mongoose/addUser')
const users = require('../mongoose/models/User.model')
const genHash = require('../methods/hash')
const isDuplicate = require('../mongoose/isDuplicate')
const validateUser = require('../methods/validate')

router.get('/', (req, res) => {
    res.send('Api is live, make a post request')
})

router.post('/', async (req, res) => {
    const { password, email, username } = req.body

    // Validate input
    try {
        await validateUser.validateAsync({ username, password, email });
    }
    catch (err) { 
        res.json({ValidationError: err["details"][0]["message"]})
        return
    }

    // Check if username already exists
    duplicate = await isDuplicate(username).catch(err => console.log(err))
    if(duplicate){
        res.json({error: "User already exists"})
        return
    }

    // Hash password
    const passwordHash = await genHash(password).catch(err => {console.log(err)})

    // Insert validated user
    await insertUser(username, email, passwordHash).catch(err => console.log(err))
    const getUsers = await users.find({}).catch(err => console.log(err))
    res.send(getUsers)
    
})

module.exports = router