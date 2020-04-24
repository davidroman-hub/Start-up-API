const express = require('express')
const router = express.Router()

const {register, registerActivate, login, requireSignin} = require('../controllers/auth')

const {userRegisterValidator, userLoginValidator} = require('../validators/auth')
const {runValidation} = require('../validators/index')

// routes

router.post('/register', userRegisterValidator, runValidation,register )
router.post('/register/activate', registerActivate )
router.post('/login', userLoginValidator, runValidation, login )
// router.get('/secret', requireSignin, (req,res) => {
//     res.json({
//         data:'this is secret page for logged user only'
//     })
// })

module.exports = router;