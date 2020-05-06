const { check } = require('express-validator');

exports.categoryCreateValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('El nombre es requerido'),
    check('image')
        .isEmpty()
        .withMessage('La imagen es requerida'),
    check('content')
        .isLength({ min: 20})
        .withMessage('El contenido es necesario')
];

exports.categoryUpdateValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('El nombre es requerido'),
    check('content')
        .isLength({ min: 20})
        .withMessage('El contenido es necesario')
];

