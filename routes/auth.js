const express = require('express')
const router = express.Router()

const {register} = require('../controllers/auth')
const {userRegisterValidator} = require('../validators/auth')
const {runValidation} = require('../validators/index')

// routes

router.post('/register', userRegisterValidator, runValidation,register )

module.exports = router;