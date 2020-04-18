const express = require('express')
const app = express()

// IMPORT ROUTES

const authRoutes = require('./routes/auth')


// middleware

app.use('/api', authRoutes)




const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is runing on port ${port}`))