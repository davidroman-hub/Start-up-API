const express = require('express')
const router = express.Router()

const {register, registerActivate, login, requireSignin, resetPassword, forgotPassword} = require('../controllers/auth')

const {userRegisterValidator, userLoginValidator, forgotPasswordValidator, resetPasswordValidator} = require('../validators/auth')
const {runValidation} = require('../validators/index')

// routes

router.post('/register', userRegisterValidator, runValidation,register );
router.post('/register/activate', registerActivate );
router.post('/login', userLoginValidator, runValidation, login );
// router.get('/secret', requireSignin, (req,res) => {
//     res.json({
//         data:'this is secret page for logged user only'
//     })
// })



/// routes for Reset Password

router.put('/forgot-password',forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password',resetPasswordValidator, runValidation, resetPassword)

module.exports = router;