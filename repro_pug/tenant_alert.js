require('dotenv').config();
const path = require('path')
const express = require('express')
var app = express()
var router = express.Router();
var db = require('./database/db2.js');




router.get('/tenant-alert',(req,res) => {
  if (req.session.loggedin) {
    user_id = req.session.userid
    value = [user_id] 
    db.query("CALL get_property(?)",
    value, function (err, result) {   
       if (err) throw err; 
       res.render('tenantAlert',
        { 
       title1: 'Tenant Alert',
       data: result[0]
      })
     })
    } 
    else {
      res.send('Please login to view this page!');
    }
   }) 




     router.get('/get-tenant-alert-details',(req,res) => {
      if (req.session.loggedin) {

        id = req.query.property_id
     
        db.query("CALL tenant_alert_details(?)", [id], function (err, result) {   
           if (err) throw err; 
           
          

           res.render('tenantAlert',
            {          
           title1: 'Tenant Alert',
           property_info: result[0],
           likes: result[1],
           views: result[2]
        })
      })
        } 
        else {
          res.send('Please login to view this page!');
        }
       }) 


   module.exports = router;