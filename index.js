const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000;
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const { checkToken } = require('./middleware')

// Initialise middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

// Require token for every method route
app.use('/api/methods/*', checkToken);

// Connect to database
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
const addProductRoute = require('./routes/addProduct')
const getProductsRoute = require('./routes/getProducts')

// Connect to route
app.use('/api/auth/login', loginRoute)
app.use('/api/auth/register', registerRoute)
app.use('/api/methods/addProduct', addProductRoute)
app.use('/api/methods/getProducts', getProductsRoute)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))