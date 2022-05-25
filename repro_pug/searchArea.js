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


     /* Search filter form route */
     router.get('/search-area', function(req, res, next) {
       res.render('searchArea', {title: 'Search Area'});
     }); 

/* Search Filter Task */
router.post('/search-area',(req,res) => {

location = req.body.location
value = [location]
db.query("CALL search_area(?);", value, function (err, result1){
    if (err) throw err; 
    console.log(result1[0])
    console.log(result1[1])
   // console.log(result1[0][0].Result_Count)


 res.render('searchResult2',
 { 
title1: 'Search Result2',
data: result1[0],
data2: result1[1]
})        
})   
 });


 module.exports = router;
 
 
 
