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





 router.get('/get-landlord',(req,res) => {
  if (req.session.loggedin) {

    user_id = req.session.userid
    value = [user_id]

db.query("CALL get_landlord(?)", value, function (err, result){
    if (err) throw err; 

    res.render('getLandlord',
    { 
    title1: 'My Landlords',
    data: result[0]
    })     

}) 

  } 
  else {
    res.send('Please login to save your search');
  }  
 });


 

 module.exports = router;
 
 
 
