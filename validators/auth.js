const { check } = require('express-validator');

exports.userRegisterValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('El nombre es requerido'),
    check('email')
        .isEmail()
        .withMessage('Se necesita un E-mail valido'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('La constraseña necesita ser de almenos 6 carateres')
];

exports.userLoginValidator = [
    check('email')
        .isEmail()
        .withMessage('Se necesita un E-mail valido'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('La constraseña necesita ser de almenos 6 carateres')
];


// reset password

exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
    
];

exports.resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({min: 6})
        .withMessage('Must be at least 6 characters long')
    
];