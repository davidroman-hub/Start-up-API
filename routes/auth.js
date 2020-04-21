const express = require('express')
const router = express.Router()

const {register, registerActivate} = require('../controllers/auth')
const {userRegisterValidator} = require('../validators/auth')
const {runValidation} = require('../validators/index')

// routes

router.post('/register', userRegisterValidator, runValidation,register )
router.post('/register/activate', registerActivate )

module.exports = router;