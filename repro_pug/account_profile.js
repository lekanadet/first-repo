require('dotenv').config();
const path = require('path')
const express = require('express')
var router = express.Router();
var db = require('./database/db2.js');
const { check,validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const fs = require('fs');
const AWS = require('aws-sdk');
var multiparty = require('multiparty');
var multer  = require('multer');
var rimraf = require("rimraf");

  

router.get('/landlord-account-profile',(req,res) => {
  if (req.session.loggedin) {
    user_id = req.session.userid
    
       res.render('landlordAccountProfile', {title: 'Account Profile'})
  
    } 
    else {
      res.send('Please login to view this page!');
    }
   }) 


   router.get('/tenant-account-profile',(req,res) => {
    if (req.session.loggedin) {
      user_id = req.session.userid
      
         res.render('tenantAccountProfile', {title: 'Account Profile'})
    
      } 
      else {
        res.send('Please login to view this page!');
      }
     }) 


router.get('/edit-landlord-profile',(req,res) => {
  if (req.session.loggedin) {
    user_id = req.session.userid
    db.query("CALL get_user_profile(?)",[user_id], function (err, result) {   
      if (err) throw err; 
       res.render('editLandlordProfile', {title: 'Edit Profile',
      data: result[0]
      })
    })
    } 
    else {
      res.send('Please login to view this page!');
    }
   })


   router.get('/edit-tenant-profile',(req,res) => {
    if (req.session.loggedin) {
      user_id = req.session.userid
      db.query("CALL get_user_profile(?)",[user_id], function (err, result) {   
        if (err) throw err; 
         res.render('editTenantProfile', {title: 'Edit Profile',
        data: result[0]
        })
      })
      } 
      else {
        res.send('Please login to view this page!');
      }
     })


   function isPasswordInUse(user_id){
    return new Promise((resolve, reject) => {
      db.query("CALL select_check_password(?,?)", [user_id], function (err, result) {
            if(!err){
              //  console.log("EMAIL COUNT : "+result[0][0].v_result);
                return resolve(result[0][0].v_result === 0);
            } else {
                return reject(new Error('Database error!!'));
            }
          }
        );
    });
  }

 

router.post('/update-user-phone-number',(req,res) => {
    if (req.session.loggedin) {
      user_id = req.session.userid
      phone_no = req.body.phone_no
      values = [user_id,phone_no]

      db.query("CALL select_check_phone_number(?,?);", values, function (err, result){
        if (err) throw err;
      
        if (result[0][0].c === 0) {

      db.query("CALL update_phone_number(?,?)",values, function (err, result) {   
        if (err) throw err; 
         res.send('Phone number updated')
      })
    }
    else if (result[0][0].c === 1) {
      res.send('You cannot update your phone record with an your existing phone number')  
      
     }
    });

  } 

      else {
        res.send('Please login to view this page!');
      }

      
     }) 

     

router.get('/get-update-password',(req,res) => {
      if (req.session.loggedin) {
        user_id = req.session.userid
        
           res.render('updatePassword', {title: 'Update Password'})
        } 
        else {
          res.send('Please login to view this page!');
        }
       })      


router.post('/update-password',[

        check('old_password')
        .not()
        .isEmpty()
        .withMessage('Old Password is required'),
        check('new_password')
        .not()
        .isEmpty()
        .withMessage('Please key in the new password')
        .isLength({min: 8, max:20})
        .withMessage('password length must be between 8 and 20 characters'),
        check('new_password_copy')
        .not()
        .isEmpty()
        .withMessage('Please re-type the new password'),
        check('new_password_copy')
        .custom(async (new_password_copy, {req}) => { 
        const password = req.body.new_password 
        if(password !== new_password_copy){ 
          throw new Error('Passwords must be same') 
        } 
      })
    
     ], 
         function(req, res, next) {
          const errors = validationResult(req);
            if (!errors.isEmpty()) {
    
                return res.status(422).json( errors.errors[0].msg );
            } 
            else{

              email = req.session.email 
              old_password = req.body.old_password
              new_password = req.body.new_password
    

db.query("CALL select_authentication(?,?);",[email,old_password], function (err, result){
  if (err) throw err;

  if (result[0][0].c === 1) {

    db.query("CALL update_password(?,?);",[email,new_password], function (err, result){
      if (err) throw err;
      console.log(result[0][0].firstname)
      firstname = result[0][0].firstname

// Step 1
const transporter = nodemailer.createTransport({
host: process.env.SMTP_HOST,
port: process.env.SMTP_PORT,
auth: {
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASSWORD
}
});

// Step 2
transporter.use('compile', hbs({
viewEngine:{layoutsDir: __dirname + "/views/layouts",
extname: ".handlebars"},
viewPath: './views/'

}));
/*
viewEngine: {
partialsDir: __dirname + "/views/partials",
layoutsDir: __dirname + "/views/layouts",
extname: ".hbs"  
}   */

// Step 3
let mailOptions = {
from: 'sokoromi@tts-nigeria.com', // TODO: email sender
to: email, // TODO: email receiver
subject: 'Password Update',
text: 'IT works 3!!',
template:'passwordUpdate',
context: {
    name: firstname
} // send extra values to template
} 

console.log(mailOptions)


// Step 4
transporter.sendMail(mailOptions, (err, data) => {
if (err) {
    return console.log('Error occurs',err);
}
return console.log('Email sent!!!', data);
});      
                                                          
res.send('password updated')                          
})
}
else if (result[0][0].c === 0) {
  res.send('Wrong exisitng password, please provide a correct existing password')  
  
}
}); 
              
   }
});      


router.post('/upload-landlord-profile-picture',(req,res) => {
  email = req.session.email

  picDirName = 'picture'+'_'+email+'_'+Date.now()
    fs.mkdir(picDirName,function(){
    });

  const imageUploadPath = path.join(__dirname,'./' + picDirName)  

  //const imageUploadPath = path.join(__dirname,'./profile_uploads')

  var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      if (file.fieldname === "profile_upload") { // if uploading resume
      callback(null, picDirName);
      } 
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname + '-' + Date.now());
    }
  });
  
  
  var upload = multer({ storage : storage}).single('profile_upload')
  

  if (req.session.loggedin) {
    user_id = req.session.userid
    id = req.params.id
    console.log(id)
    email = req.session.email
    upload(req,res,function(err) {
      if(err) {
          return res.end("Error uploading Pictures.");
      }
      console.log(req.file)
    
      console.log("File is upload is connected");   


const s3 = new AWS.S3({
accessKeyId: process.env.AWS_ACCESS_KEY,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});



const uploadFile = () => {
fs.readdir(imageUploadPath, function (err, files) {
  if (files.length >= 1) {
  if (err) throw err;
  files.forEach(file => { 
    console.log(file); 
//buf = new Buffer(files, 'base64');
buf = Buffer.from(files,'base64')
var bucketName = 'realprobucket/repro_profile_pictures';
 const params = {
     Bucket: bucketName, // pass your bucket name
     Key: file, // file will be saved as testBucket/contacts.csv
     Body: buf,
     
 };
 s3.upload(params, function(s3Err, data) {
     if (s3Err) throw s3Err
     console.log(`File uploaded successfully at ${data.Location}`)
     console.log(`File saved as  ${data.Key}`)
    
    
    attachment_url = data.Location
    attachment_name = data.Key
    
    value = [user_id,attachment_url,attachment_name] 
    db.query("CALL add_landlord_profile_photo(?,?,?)", value, function (err, result) {   
       if (err) throw err; 
      // console.log(result[0])
       
      });
    });
    
    rimraf(imageUploadPath, function (err) { 
      if (err) throw err;
      console.log('Picture temp folder deleted ');
     });

     })
    }
    else if (files.length === 0){

      db.query("CALL add_profile_photo_no_upload(?)",[user_id], function (err, result) {   
        if (err) throw err; 
        // console.log(result[0])
    });

}    


    })
  }
     uploadFile();
  
     res.redirect('/edit-landlord-profile')
  
    
  })
  }
    else {
      res.send('Please login to view this page!');
    }
   })


router.post('/upload-tenant-profile-picture',(req,res) => {
    email = req.session.email
  
    picDirName = 'picture'+'_'+email+'_'+Date.now()
      fs.mkdir(picDirName,function(){
      });
  
    const imageUploadPath = path.join(__dirname,'./' + picDirName)  
  
    //const imageUploadPath = path.join(__dirname,'./profile_uploads')
  
    var storage =   multer.diskStorage({
      destination: function (req, file, callback) {
        if (file.fieldname === "profile_upload") { // if uploading resume
        callback(null, picDirName);
        } 
      },
      filename: function (req, file, callback) {
        callback(null, file.originalname + '-' + Date.now());
      }
    });
    
    
    var upload = multer({ storage : storage}).single('profile_upload')
    
  
    if (req.session.loggedin) {
      user_id = req.session.userid
      id = req.params.id
      console.log(id)
      email = req.session.email
      upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading Pictures.");
        }
        console.log(req.file)
      
        console.log("File is upload is connected");   
  
  
  const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  
  
  
  const uploadFile = () => {
  fs.readdir(imageUploadPath, function (err, files) {
    if (files.length >= 1) {
    if (err) throw err;
    files.forEach(file => { 
      console.log(file); 
  //buf = new Buffer(files, 'base64');
  buf = Buffer.from(files,'base64')
  var bucketName = 'realprobucket/repro_profile_pictures';
   const params = {
       Bucket: bucketName, // pass your bucket name
       Key: file, // file will be saved as testBucket/contacts.csv
       Body: buf,
       
   };
   s3.upload(params, function(s3Err, data) {
       if (s3Err) throw s3Err
       console.log(`File uploaded successfully at ${data.Location}`)
       console.log(`File saved as  ${data.Key}`)
      
      
      attachment_url = data.Location
      attachment_name = data.Key
      
      value = [user_id,attachment_url,attachment_name] 
      db.query("CALL add_tenant_profile_photo(?,?,?)", value, function (err, result) {   
         if (err) throw err; 
        // console.log(result[0])
         
        });
      });
      
      rimraf(imageUploadPath, function (err) { 
        if (err) throw err;
        console.log('Picture temp folder deleted ');
       });
  
       })
      }
      else if (files.length === 0){
  
        db.query("CALL add_tenant_profile_photo_no_upload(?)",[user_id], function (err, result) {   
          if (err) throw err; 
          // console.log(result[0])
      });
  
  }    
  
  
      })
    }
       uploadFile();
    
       res.redirect('/edit-tenant-profile')
    
      
    })
    }
      else {
        res.send('Please login to view this page!');
      }
     })   





   router.post('/upload-tenant-profile-picture/:id',(req,res) => {
    if (req.session.loggedin) {
      
      user_id = req.session.userid
      id = req.params.id
      console.log(id)
      console.log(user_id)
      email = req.session.email
      console.log(email)
      upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading Pictures.");
        }
        console.log(req.file)
      
        console.log("File is upload is connected");   
  
  
  const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  
  
  
  const uploadFile2 = () => {
  fs.readdir(imageUploadPath, function (err, files) {
    if (files.length >= 1) {
    if (err) throw err;
    files.forEach(file => { 
      console.log(file); 
  //buf = new Buffer(files, 'base64');
  buf = Buffer.from(files,'base64')
  var bucketName = 'realprobucket/repro_profile_pictures';
   const params = {
       Bucket: bucketName, // pass your bucket name
       Key: file, // file will be saved as testBucket/contacts.csv
       Body: buf,
       
   };
   s3.upload(params, function(s3Err, data) {
       if (s3Err) throw s3Err
       console.log(`File uploaded successfully at ${data.Location}`)
       console.log(`File saved as  ${data.Key}`)
      
      
      attachment_url = data.Location
      attachment_name = data.Key
      console.log(attachment_url,attachment_name)
      value = [id,attachment_url,attachment_name] 
      db.query("CALL add_tenant_profile_photo(?,?,?)", value, function (err, result) {   
         if (err) throw err; 
        // console.log(result[0])
         
        });
      });
      
  fs.unlink(imageUploadPath + '/' + file, function (err) {
        if (err) throw err;
        console.log(file + ' File deleted!');
      });
  
       })
      }
      else if (files.length === 0){
  
        db.query("CALL add_profile_photo_no_upload(?)",[user_id], function (err, result) {   
          if (err) throw err; 
          // console.log(result[0])
      });
  
  }    
  
  
      })
    }
       uploadFile2();
    
       res.redirect('/edit-tenant-profile')
    
      
    })
    }
      else {
        res.send('Please login to view this page!');
      }
     })


   module.exports = router;   