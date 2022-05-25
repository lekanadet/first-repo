require('dotenv').config();
const path = require('path')
const express = require('express')
var app = express()
var router = express.Router();
var db = require('./database/db2.js');



router.get('/log-out-old',(req,res) => {
  req.session.destroy((err) => {
    if(err) {
        return console.log(err);
    }
    res.redirect('/login-form');
});
   }) 

   router.get('/log-out',(req,res) => {
      res.send('Please clear the token and log the user out');
  });
       


   module.exports = router;