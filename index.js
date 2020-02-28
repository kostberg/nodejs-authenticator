const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000;
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// Initialise middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// Connect to database
;
(async function () {
    const DB = process.env.DB_CONNECT_STR
    await mongoose.connect(DB, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})().catch(err => {
    console.log(`An error occured: ${err}`)
})


// Import routes
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')

// Connect to route
app.use('/api/login', loginRoute)
app.use('/api/register', registerRoute)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))