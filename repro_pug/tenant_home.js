require('dotenv').config();
const path = require('path')
const express = require('express')
var app = express()
var router = express.Router();
var db = require('./database/db2.js');



router.get('/tenant-home',(req,res) => {
  if (req.session.loggedin) { 
    db.query("CALL get_property_pictures()", function (err, result) {   
       if (err) throw err; 
       //console.log(result[0])
      // console.log(result[1])
       res.render('tenant_home',
        { 
       title1: 'Tenant Home',
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