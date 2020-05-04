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
        .withMessage('Necesita haber un E-mail valido')
    
];

exports.resetPasswordValidator = [
    check('newPassword')
        .isLength({min: 6})
        .withMessage('La contraseña necesita tener 6 caracteres'),
    check('resetPasswordLink')
        .not()
        .isEmpty()
        .withMessage('EL token es requerido')
    
];