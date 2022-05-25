require('dotenv').config();
const crypto = require("crypto");
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
router.get('/search-filter', function(req, res, next) {
  res.render('searchFilter', {title: 'Search Filter'});
   }); 

/* Search Filter Task */
router.get('/do-search-filter',(req,res) => {
  
  location = req.query.location
  property_type = req.query.property_type
  min = req.query.min
  max = req.query.max
  bed = req.query.bed
  bath = req.query.bath
  purpose = req.query.purpose
value1 = [location,property_type,min,max,bed,bath,purpose]
db.query("CALL search_filter_special(?,?,?,?,?,?,?)", value1, function (err, result1){
    if (err) throw err; 
    console.log(result1[0])
    console.log(result1[1])
    console.log(result1[2])


 res.render('searchResult',
 {
title1: 'Search Result',
data: result1[0],
data2: result1[1],
data3: result1[2]
 })        
})   
 });


 router.get('/view-properties/:id',(req,res) => {
  
id = req.params.id

db.query("insert into property_views (property_id) values(?)", [id], function (err, result1){
    if (err) throw err;


 res.render('propertyPage',
 {
title1: 'Search Result',
data: result1[0],
data2: result1[1],
data3: result1[2]
 })        
})   
 });




 /* Search filter form route */
router.get('/short-search-filter', function(req, res, next) {
  res.render('shortSearchFilter', {title: 'Search Filter'});
   }); 

/* Shortlet Search Filter Task */
router.get('/do-shortlet-search-filter',(req,res) => {
  
  location = req.query.location
  check_in_date = req.query.check_in_date
  check_out_date = req.query.check_out_date
  adult = req.query.adult
  child = req.query.child

value1 = [location,check_in_date,check_out_date,adult,child]
db.query("CALL shortlet_search_filter(?,?,?,?,?)", value1, function (err, result1){
    if (err) throw err; 
    console.log(result1[0])
    console.log(result1[1])

 res.send(
 {
searchResult: result1[0],
count: result1[1]
 })        
})   
 });



 /*Shortlet Filter Task */
router.get('/do-shortlet-filter',(req,res) => {
  
  start_price = req.query.start_price
  end_price = req.query.end_price

value1 = [start_price,end_price]
db.query("CALL shortlet_filter(?,?)", value1, function (err, result1){
    if (err) throw err; 
    console.log(result1[0])
    console.log(result1[1])

 res.send(
 {
searchResult: result1[0],
count: result1[1]
 })        
})   
 });





/* Search Filter Task */
router.get('/do-shortlet-search-filter2',(req,res) => {
  
  location = req.query.location
  check_in_date = req.query.check_in_date
  check_out_date = req.query.check_out_date
  adult = req.query.adult
  child = req.query.child

  const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);

// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

// the cipher function
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

let encryptedData = cipher.update(check_in_date, "utf-8", "hex");

encryptedData += cipher.final("hex");

console.log("Encrypted message: " + encryptedData);

// the decipher function
const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

decryptedData += decipher.final("utf8");

console.log("Decrypted message: " + decryptedData);

value1 = [location,encryptedData,check_out_date,adult,child]
db.query("CALL shortlet_search_filter(?,?,?,?,?)", value1, function (err, result1){
    if (err) throw err; 
    console.log(result1[0])
    console.log(result1[1])

 res.send(
 {
searchResult: result1[0],
count: result1[1]
 })        
})   
 });


const querystring = require('querystring');
const url = "http://example.com/index.html?code=string&key=12&id=false";
const qs = "code=string&key=12&id=false";

console.log(querystring.parse(qs));
// > { code: 'string', key: '12', id: 'false' }

console.log(querystring.parse(url));


 module.exports = router;
 
 
 
