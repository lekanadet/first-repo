require('dotenv').config();
const path = require('path')
const express = require('express')
var router = express.Router();
var db = require('./database/db2.js');




router.get('/get-tenant-payments',(req,res) => {
  if (req.session.loggedin) {
    id = req.session.userid
  db.query("CALL get_tenant_payments(?)", [id], function (err, result) {   
     if (err) throw err; 
     res.render('tenantPayments',
     { 
      title1: 'Landlord Payments',
      data: result[0]
     })
   })
  } 
  else {
    res.send('Please login to view this page!');
  }
 }) 


 

   /* Search Filter Task */
router.get('/search-tenant-payments',(req,res) => {
  if (req.session.loggedin) {
  user_id = req.session.userid
  search_string = req.query.search_string
  
value = [user_id,search_string]
db.query("CALL search_tenant_payments(?,?)", value, function (err, result1){
    if (err) throw err; 
    console.log(result1[0])


 res.render('searchTenantPaymentResult',
 {
title1: 'Search Payment Result',
data: result1[0]
 })        
}) 
}
else {
 res.send('Please login to view this page!');
}  
 });

 //router.get('/get-maintainance-details/:id',(req,res) => {
 router.get('/download-file/:id',(req, res) => {
  if (req.session.loggedin) {
 keyname = req.params.id
 filename = req.params.id2
  var s3 = new AWS.S3();
  var s3Params = {
      Bucket: 'realprobucket',
      Key: keyname
  };
  s3.getObject(s3Params, function(err, data) {
      if (err === null) {
         res.attachment(filename); // or whatever your logic needs
         res.send(data.Body);
      } else {
         res.status(500).send(err);
      }
  });
}
else {
 res.send('Please login to view this page!');
} 
  });
  
  


   module.exports = router;