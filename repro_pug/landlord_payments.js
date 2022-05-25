require('dotenv').config();
const path = require('path')
const express = require('express')
var router = express.Router();
var db = require('./database/db2.js');




router.get('/get-landlord-payments',(req,res) => {
  if (req.session.loggedin) {
    id = req.session.userid
  db.query("CALL get_landlord_payments(?)", [id], function (err, result) {   
     if (err) throw err; 
     res.render('landlordPayments',
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


 router.get('/get-bank-details',(req,res) => {
  user_id = req.session.userid
  
  db.query("CALL get_bank_details(?)",[user_id], function (err, result) {   
     if (err) throw err; 
     res.render('bankDetails',
     { 
      title1: 'Bank Details',
      data: result[0]
     })
    // res.redirect('/tenant-home')
   })
 }) 


 router.get('/add-bank-details',(req,res) => {
  if (req.session.loggedin) {
  user_id = req.session.userid
  
     res.render('addDetails',
     { 
      title1: 'Add Details'})
    // res.redirect('/tenant-home')
     }
      else {
     res.send('Please login to view this page!');
   }
 })
 


 router.post('/add-bank-details',(req,res) => {
  if (req.session.loggedin) {
  user_id = req.session.userid
  bankname = req.body.bankname
  account_no = req.body.account_no
  account_name = req.body.account_name

  values = [user_id,bankname,account_no,account_name]
  
  db.query("CALL select_add_bank_details(?,?,?,?)",values, function (err, result) {   
     if (err) throw err; 

     if (result[0][0].v_result === 1) {
       res.send('You have an exisitng Bank linked to your account. You can only change or update your existing bank details')
     } else {
      res.send('Bank details added')
     }
   })
  }
   else {
    res.send('Please login to view this page!');
  }
 }) 


router.post('/edit-bank-details',(req,res) => {
  if (req.session.loggedin) {
    user_id = req.session.userid
    bankname = req.body.bankname
    account_no = req.body.account_no
    account_name = req.body.account_name

    values = [user_id,bankname,account_no,account_name]
    
    db.query("CALL update_bank_details(?,?,?,?)",values, function (err, result) {   
       if (err) throw err; 
        res.send('Bank details updated')
      // res.redirect('/tenant-home')
     })
    }
    else {
     res.send('Please login to view this page!');
   }
   }) 



   /* Search Filter Task */
router.get('/search-landlord-payments',(req,res) => {
  if (req.session.loggedin) {
  user_id = req.session.userid
  search_string = req.query.search_string
  
value = [user_id,search_string]
db.query("CALL search_payments(?,?)", value, function (err, result1){
    if (err) throw err; 
    console.log(result1[0])


 res.render('searchLandlordPaymentResult',
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