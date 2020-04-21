const User = require('../models/user');
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const { registerEmailParams } = require('../helpers/email');
const shortId = require('shortid')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });


// register the account


exports.register = (req, res) => {
    // console.log('REGISTER CONTROLLER', req.body);
    const { name, email, password } = req.body;
    // check if user exists in our db
    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
        // generate token with user name email and password
        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, {
            expiresIn: '10m'
        });

        // send email
        const params = registerEmailParams(email, token);

        const sendEmailOnRegister = ses.sendEmail(params).promise();

        sendEmailOnRegister
            .then(data => {
                console.log('email submitted to SES', data);
                res.json({
                    message: `E-mail ha sido enviado a ${email}, Sigue las instrucciones para terminar tu registro`
                });
            })
            .catch(error => {
                console.log('ses email on register', error);
                res.json({
                    message: `No pudimos verificar tu e-mail intenta de nuevo.`
                });
            });
    });
};


/// activate the account

exports.registerActivate = (  req, res) => {
    const {token} = req.body;
   // console.log(token)
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION,function(err,decoded) {
        if (err){
            return res.status(401).json({
                error: 'El link ha expirado. Intenta de nuevo.'
            })
        }
            // we need to check to dont we build or duplicate user with the same E-mail.
        const {name, email, password} = jwt.decode(token)
        const username = shortId.generate()

        User.findOne({email}).exec((err, user) => {
            if(user) {
                return res.status(401).json({
                    error: 'Usuario con ese E-mail ya existe! '
                })
            }
            // save the user in database
            const newUser = new User ({
                username,
                name,
                email,
                password
            })
            newUser.save((err, result) => {
                if(err){
                    return res.status(401).json({
                    error:'Error guardando usuario en la base de datos. Intenta mas tarde'
                })
            }
                return res.json({
                    message:'Registro éxitoso porfavor inicia Sesión'
                })
            })
        })

    })
}


/// login users methods

exports.login = (req,res) => {
    const {email, password} = req.body
   // console.table({email,password})
    User.findOne({email}).exec ((err, user) => {
        if (err || !user){
            return res.status(400).json({
                error:'Usuario con ese E-mail no existe. profavor registrate'
            })
        }
        // if exist we want to use method authenticate from User.schema
        if(!user.authenticate(password)){
            return res.status(400).json({
                error:'El E-mail y la contraseña no coinciden'
            })
        }

        // generate auth token and send to the client

        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:'7d'})
        const {_id, name, email, role} = user
        return res.json({
            token, user:{_id,name, email, role}
        })
    })
}