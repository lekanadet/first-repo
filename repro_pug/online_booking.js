require('dotenv').config();
const path = require('path')
const express = require('express')
var app = express()
var router = express.Router();
var db = require('./database/db2.js');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars'); 


router.post('/online_booking',(req,res) => {

    firstname = req.body.firstname
    lastname = req.body.lastname
    email = req.body.email
    phone_no = req.body.phone_no
    dob = req.body.dob
    dob_p = new Date(dob)

    nationality = req.body.nationality
    mode_of_id = req.body.mode_of_id
    id_number = req.body.id_number
    doa = req.body.doa
    doa_p = new Date(doa)

    dod = req.body.dod
    dod_p = new Date(dod)

    no_of_adult = req.body.no_of_adult
    no_of_children = req.body.no_of_children
    room = req.body.room

    console.log(dob)
    console.log(dob_p)
    console.log(doa)
    console.log(dod)
    
  value = [firstname, lastname, email, phone_no, dob_p, nationality, mode_of_id, id_number, doa_p, dod_p,no_of_adult,no_of_children,room] 
  console.log(value)
  db.query("CALL new_booking(?,?,?,?,?,?,?,?,?,?,?,?,?);",
  value, function (err, result) {   
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
  
  var maillist = 'adetutu.olalekan@gmail.com, adetutu.olalekan@yahoo.com, adetutu.olalekan@gmail.com';

  // Step 3
  let mailOptions = {
  from: process.env.FROM_EMAIL, // TODO: email sender
  to: maillist, // TODO: email receiver
  subject: 'Booking Notification',
  text: 'IT works 3!!',
  template:'booking',
  context: {
    
      firstname: firstname, lastname: lastname, email: email, phone_no: phone_no, dob: dob, 
      nationality: nationality,mode_of_id: mode_of_id, id_number: id_number, doa: doa, dod: dod,
      no_of_adult: no_of_adult, no_of_children: no_of_children, room: room
    
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
 

     
     res.send('Your Booking was successfully Sent')

   })
 }) 

module.exports = router;