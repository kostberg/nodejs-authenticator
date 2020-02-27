const router = require('express').Router()
const insertUser = require('../mongoose/addUser')
const users = require('../mongoose/models/User.model')

router.get('/', (req, res) => {
    res.send('API is live')
})

router.post('/', async (req, res) => {



    // Insert validated user
    insertUser(req.body)
    const getUsers = await users.find({}).catch(err => console.log(err))
    res.send(getUsers)
    
})

module.exports = router