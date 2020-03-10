const router = require('express').Router()
const Users = require('../mongoose/models/User.model')
const productExists = require('../mongoose/productExists')
const validateProduct = require('../methods/validateProduct')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    res.send('Api is live, make a post request')
})

router.post('/', async (req, res) => {
    console.log("Request recieved")

    // Get user token and product to add
    const {
        token,
        name,
        price,
        image
    } = req.body

    // Validate input
    try {
        await validateProduct.validateAsync({
            token,
            name,
            price,
            image
        });
    } catch (err) {
        res.json({
            error: err["details"][0]["message"]
        })
        return
    }

    // Get user id from token
    const { _id } = req.decoded

    // Check if product name already exists
    duplicate = await productExists(name).catch(err => console.log(err))
    if (!duplicate) {
        res.status(400).json({
            error: "Product already exists"
        })
        return
    }

    // Add product to user
    const user = await Users.findOne({ _id })
    user.products.push({
        name,
        price,
        image
    })
    await user.save()

    res.status(200).json({
        error: null
    })
})

module.exports = router