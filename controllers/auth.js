const User = require('../models/user')
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken')
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

exports.register = (req, res) => {
    // console.log('REGISTER CONTROLLER', req.body);
    const { name, email, password } = req.body;
    // check if user exit in data abse

    User.findOne({email}).exec((err, user) => {
        if(user){
            console.log(err)
            return res.status(400).json({
                error:"Este E-mail ha sido usado"
            })
        }
        /// generate token with user email password
        const token = jwt.sign({name,email,password}, process.env.JWT_ACCOUNT_ACTIVATION,{
            expiresIn:'20m'
        });

        const params = {
            Source: process.env.EMAIL_FROM,
            Destination: {
                ToAddresses: [email]
            },
            ReplyToAddresses: [process.env.EMAIL_TO],
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: `
                        <html>
                            <h1>Hola ${name} Verifica tu E-mail</h1>
                            <h4>Porfavor haz click en el siguiente link para completar tu registro!</h4>
                            <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                        </html>`
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: 'Complete your registration'
                }
            }
        };
    
        const sendEmailOnRegister = ses.sendEmail(params).promise();
    
        sendEmailOnRegister
            .then(data => {
                console.log('email submitted to SES', data);
                res.send('Email sent');
            })
            .catch(error => {
                console.log('ses email on register', error);
                res.send('email failed');
            });


    });

   
};
