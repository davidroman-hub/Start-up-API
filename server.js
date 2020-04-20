const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();



const app = express()

//connect mongo db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB CONNECTION ERROR: ', err));

    // mongoose
    // .connect(process.env.DATABASE)
    // .then(() => console.log('DB connected'))
    // .catch(err => console.log('DB CONNECTION ERROR: ', err));

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