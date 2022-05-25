require("dotenv/config")   
const express = require('express')
const router = express.Router()   
var db = require('./database/db2.js');            
const multer = require('multer')              
const Aws = require('aws-sdk')    
const fs = require('fs')           
                  



const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        if (file.fieldname === "property_picture") { // if uploading resume
        callback(null, './pictures');
        } 
    },
      filename: function (req, file, callback) {
        callback(null, Date.now() + '_' + file.originalname);
      }
})


const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// defining the upload variable for the configuration of photo being uploaded
const upload = multer({ storage: storage, fileFilter: filefilter });

// Now creating the S3 instance which will be used in uploading photo to s3 bucket.
const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID2,              
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY2       
})


router.post('/upload-testpictures', upload.array('productimage',10), (req, res) => {
    console.log(req.file) 
  
    
    const params = {
        Bucket:process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
        Key:Date.now() + '_' + req.file.originalname,               // Name of the image
        Body:req.file.buffer,                   // defining the permissions to get the public link
        ContentType:"image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
    };
  
   // uplaoding the photo using s3 instance and saving the link in the database.
    
    s3.upload(params,(error,data)=>{
        if(error){
            res.status(500).send({"err":error}) 
        }
        
    console.log(data)                     
    
   // saving the information in the database.   
   value = [data.Location,data.Key] 
   db.query("CALL add_test_picture(?,?);", value, function (err, result) {   
  if (err) throw err; 
 // console.log(result[0])
 res.status(200).send({
  productLocation: data.Location,
  productKey: data.Key

})
});
    })
})



router.post('/upload-testpictures2', upload.single('productimage'), (req, res) => {
    console.log(req.file) 
  
    
    const fileStream = fs.createReadStream(req.file.path)

    const params = {
      Bucket:process.env.AWS_BUCKET_NAME, 
      Body: fileStream,
      Key: req.file.filename,
      ContentType:"image/jpeg"
    }
    
    s3.upload(params,(error,data)=>{
        if(error){
            res.status(500).send({"err":error}) 
        }
        
    console.log(data)                     
    
   // saving the information in the database.   
   value = [data.Location,data.Key] 
   db.query("CALL add_test_picture(?,?);", value, function (err, result) {   
  if (err) throw err; 
 // console.log(result[0])
 res.status(200).send({
  productLocation: data.Location,
  productKey: data.Key

})
});
    })
})


router.get('/upload-testpics',(req,res) => { 
       
     res.render('upload2',{title: 'Picture Upload Form'})
    
    }) 


// Get all the product data from db 
// router.get('/testpics', (req, res) => {
//     try {
//         console.log("hello")
//         const products = await Product.find()
        
//         console.log(products)
//         res.send(products)
//     } catch (err) {
//         res.send({ message: err, m:"not working" })
//     }
// });


module.exports = router