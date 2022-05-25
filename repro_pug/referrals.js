require('dotenv').config();
const path = require('path')
const express = require('express')
var app = express()
var router = express.Router();
var db = require('./database/db2.js');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');

  

router.get('/referrals',(req,res) => {
  if (req.session.loggedin) {
    user_id = req.session.userid
    db.query("CALL get_referrals(?)",[user_id], function (err, result) {   
      if (err) throw err; 
       res.render('referrals', {title1: 'Referrals',
      data: result[0]
      })
    })
    } 
    else {
      res.send('Please login to view this page!');
    }
   }) 




   router.get('/new-referrals',(req,res) => {
    if (req.session.loggedin) {
      
      email = req.session.email 
      db.query("CALL get_landlord_name(?)",[user_id], function (err, result) {   
        if (err) throw err; 
         res.render('newReferrals',
          {title1: 'New Referrals',
          email: email,
          data: result[0]
        })
      })
      } 
      else {
        res.send('Please login to view this page!');
      }
     }) 


router.post('/new-referral-submission',(req,res) => {
  if (req.session.loggedin) {
    user_id = req.session.userid
    recepient = req.body.recepient
    requester = req.body.requester
    subject = req.body.subject
    message = req.body.message
    console.log(requester)
    console.log(message)
    value = [user_id,recepient,requester,subject,message] 
    db.query("CALL new_referral_submission(?,?,?,?,?)",value, function (err, result) {   
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
  from: 'sokoromi@tts-nigeria.com', // will change when all registered email has been registered or verified at the mail provider platform
  to: recepient, // TODO: email receiver
  subject: subject,
  text: 'IT works 3!!',
  template:'referral',
  context: {
      name: result[0][0].name,
      message: message
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

       res.redirect('/referrals')
     })
    } 
    else {
      res.send('Please login to view this page!');
    }
   }) 


   module.exports = router;