const Category = require('../models/category')
const slugify = require('slugify')

// for the image key etc..

const formidable = require('formidable')
const AWS = require('aws-sdk')
const uuidv4 = require('uuid/v4')

// s3

const s3 = new AWS.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    region:process.env.AWS_REGION
})


/// all the controllers 

// exports.create = (req,res) => {
//     const {name, content} = req.body
//     const slug = slugify(name)
//     const image = {
//         url:`https://via.placeholder.com/200x150.png?text=${process.env.CLIENT_URL}`,
//         key:'123',
//     };


//     const category = new Category({name, slug, image})
//     category.postedBy = req.user._id

//     category.save((err, data) => {
//         if (err){
//             console.log('Error al crear categoria',err)
//             return res.status(400).json({
//                 error:'Error al crear categoria'
//             })
//         }
//         res.json(data)
//     })
// }

exports.create = (req,res) => {
    let form = new formidable.IncomingForm()
    form.parse(req,(err, fields,files) => {
        if (err) {
            return res.status(401).json({
                error:'La imagen no se pudo subir'
            })
        }
        //console.table({err,fields,files})
        const {name, content} = fields;
        const {image} = files;

        const slug = slugify(name);
        let category = new Category({name, content,slug})
        if(image.size > 2000000 ){
            return res.status(400).json({
                error:"La imagen debe ser de menos de 2MB"
            })
        }

        //upload image to s3

        const params = {
            Bucket:'hackrdev',
            Key:`category/${uuidv4()}`,
            Body:image.path,
            ACL:'public-read',
            ContentType:`image/jpg`
        };
        
        s3.upload(params, (err,data)=>{
            if(err) //console.log(err) 
            {
                console.log(err);
                 res.status(400).json({error:" cargar al s3 fallo"}) 
            }
            console.log('AWS upload res data', data)
             category.image.url = data.Location
             category.image.key = data.Key

            // // save to db
            category.save((err,success) => {
                if (err) res.status(400).json({error:'Error en guardar categorya en la base de datos'})
                return res.json(success)
            })
        })

    })
}

exports.list = (req,res) => {
    //
}
exports.read = (req,res) => {
    //
}
exports.update = (req,res) => {
    //
}
exports.remove = (req,res) => {
    //
}