const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000;

// Import routes
const authRoute = require('./routes/auth')

app.use('/api', authRoute)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))