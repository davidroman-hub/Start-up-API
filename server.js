const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();



const app = express()

// IMPORT ROUTES

const authRoutes = require('./routes/auth')

//App middelwares
app.use(morgan('dev'));
app.use(bodyParser.json());
//app.use(cors());
app.use(cors({origin:process.env.CLIENT_URL}))

// middleware

app.use('/api', authRoutes)




const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is runing on port ${port}`))