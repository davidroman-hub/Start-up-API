const express = require('express')
const router = express.Router()

const {register, registerActivate, login} = require('../controllers/auth')

const {userRegisterValidator, userLoginValidator} = require('../validators/auth')
const {runValidation} = require('../validators/index')

// routes

router.post('/register', userRegisterValidator, runValidation,register )
router.post('/register/activate', registerActivate )
router.post('/login', userLoginValidator, runValidation, login )

module.exports = router;