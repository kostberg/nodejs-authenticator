const router = require('express').Router()

router.get('/auth', (req, res) => {
    res.send('Working')
})

router.post('/auth', (req, res) => {
    res.send('Hello there!')
})

module.exports = router