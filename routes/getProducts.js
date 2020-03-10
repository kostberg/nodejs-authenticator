const router = require('express').Router()
const Users = require('../mongoose/models/User.model')
const validateToken = require('../methods/validateToken')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    res.send('Api is live, make a post request')
})

router.post('/', async (req, res) => {

    // Get user token
    const {
        token
    } = req.body

    // Get token info
    const {
        decoded
    } = req.decoded

    // Validate token
    try {
        await validateToken.validateAsync({
            token
        });
    } catch (err) {
        res.json({
            error: err["details"][0]["message"]
        })
        return
    }

    // Get user id from token
    try {
        const { _id } = req.decoded
        // Get products
        const user = await Users.findOne({ _id })
        if(user == [] || !user){
            return false
        } else {
            res.status(200).json({
                error: null,
                products: user.products
            })
        }
    } catch (err) {
        res.json({
            error: err
        })
        return
    }
})

module.exports = router