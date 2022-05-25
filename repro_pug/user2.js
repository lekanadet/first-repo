require('dotenv').config();
var cron = require('node-cron');
var schedule = require('node-schedule');
const path = require('path')
const express = require('express')
var app = express()
var router = express.Router();
var db = require('./database/db2.js');
const bodyparser = require('body-parser')
const { check,validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
var session = require("express-session");




app.use(session({
  secret: 'asdf;lkjh3lkjh235l23h5l235kjh',
  resave: true,
  saveUninitialized: false
}));






app.use(bodyparser.urlencoded({
    extended: false

 })); 

app.use(bodyparser.json())






/*Register Landlord routes */
router.get('/register-form-tenant', function(req, res, next) {
  res.render('register-tenant', {title: 'Register Tenant'});
});


/* Register Landlord task */
router.post('/register-tenant',[

check('firstname')
.not()
.isEmpty()
.withMessage('Firstname is required'),
check('lastname')
.not()
.isEmpty()
.withMessage('Lastname is required'),
check('email')
.not()
.isEmpty()
.withMessage('Email is required')
.isEmail()
.withMessage('Invalid Email'),
check('email')
.custom(async email => {
   const value = await isEmailInUse(email);
   if (value) {
    throw new Error('Email is already in Use!!!');
    
}
}),
check('phone_no')
.not()
.isEmpty()
.withMessage('Phone number is required')
.custom(async phone_no => {
  const value = await isPhoneInUse(phone_no);
  if (value) {
   throw new Error('Phone number already in use!!!');
   
}
}),
check('password')
.not()
.isEmpty()
.withMessage('Password is required')

], 
 function(req, res, next) {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(422).json( errors.errors[0].msg );
    } 
    else{

      function randomNumber() {
        return Math.floor(100000 + Math.random() * 900000);
      }

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const phone_no = req.body.phone_no;
  const password = req.body.password;
  const secret = randomNumber()


var values = [firstname,lastname,email,phone_no,password,secret]

db.query("CALL add_tenant(?,?,?,?,?,?)",values, function (err, result){
if (err) throw err;




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
subject: 'Email Verification',
text: 'IT works 3!!',
template:'index',
context: {
name: firstname,
secret: secret
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
                                                      
res.render('verify',{email:email})                          
                                                      
//res.send( 'take to verify page. in the verify page also have a link that calls the resend-undeleted api () to resend another code incase need be')
});
}
});



function isEmailInUse(email){
  return new Promise((resolve, reject) => {
    db.query("CALL select_check_email(?)", [email], function (err, result) {
          if(!err){
            //  console.log("EMAIL COUNT : "+result[0][0].v_result);
              return resolve(result[0][0].v_result === 1);
          } else {
              return reject(new Error('Database error!!'));
          }
        }
      );
  });
}

function isVerifiedValid(email){
  return new Promise((resolve, reject) => {
    db.query("CALL select_check_verify(?)", [email], function (err, result) {
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

function isPhoneInUse(phone_no){
  return new Promise((resolve, reject) => {
    db.query("CALL select_check_phone_no(?)", [phone_no], function (err, result) {
          if(!err){
            //  console.log("EMAIL COUNT : "+result[0][0].v_result);
              return resolve(result[0][0].v_result === 1);
          } else {
              return reject(new Error('Database error!!'));
          }
        }
      );
  });
}
  
  module.exports = router;
  

