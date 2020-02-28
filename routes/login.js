const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Api is live, make a post request')
})

router.post('/', (req, res) => {
    res.send('Hello')
})

module.exports = router