require('dotenv').config();
const path = require('path')
const express = require('express')
var app = express()
var router = express.Router();
var db = require('./database/db2.js');



router.get('/landlord-home',(req,res) => {
  if (req.session.loggedin) { 
    user_id = req.session.userid
    value = [user_id]
    db.query("CALL get_landlord_property(?)", value, function (err, result) {   
      if (err) throw err; 
       res.render('landlord_home',
        { 
       title1: 'Landlord Home',
       data: result[0],
       name: req.session.username + ' Dashboard'
      })
    })
    } 
    else {
      res.send('Please login to view this page!');
    }
   }) 


   module.exports = router;